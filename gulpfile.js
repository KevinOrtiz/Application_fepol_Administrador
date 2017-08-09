var gulp = require('gulp');
var browserSync = require('browser-sync');
let jshint = require('gulp-jshint');
let nodemon = require('gulp-nodemon');
let minify = require('gulp-clean-css');
var uglify = require('gulp-uglify');
let watch = require('gulp-watch');





gulp.task('start_project',['browser-sync'],()=>{
    console.log("Ejecutando la aplicacion del Modulo Estudiante");
    let date = new Date();
    console.log(`Fecha:${date.getDate()}`);
    console.log(`Hora:${date.getHours()}`);

});

gulp.task('test',()=>{
    console.log("prueba pasada con exito");
});


gulp.task('lint',()=>{
    gulp.src('./**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter("REPORTES-JAVASCRIPT"))
});

gulp.task('clean-css',()=>{
    gulp.src('./public/css3/**/*.css')
        .pipe(minify())
        .pipe(gulp.dest('./public/min-css/'))
});

gulp.task('clean-js',()=>{
    gulp.src('./public/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/min-js/'))
});

gulp.task('compile-scss',()=>{
    return gulp.src('./public/sass/**/*.scss')
                .pipe(sass().on('error',sass.logError))
                .pipe(gulp.dest('./public/css3/'))
});

gulp.task('watch_files_scss',()=>{
    return watch('./public/sass/**/*.scss',['compile-scss'])
});

gulp.task('watch_files_js',()=>{
    return watch('./public/js/**/*.js',['clean-js'])
});



gulp.task('nodemon',(cb)=>{
    var start = false;
    return nodemon({
        script:'app.js',
        ext: 'js',
        task:['lint'],
        ignore:['node_modules/','public/lib/'],
    }).
        on('start',()=>{
            if(!start){
                cb();
                start = true;
            }
        })
      .
        on('restart',()=>{
            console.log("reiniciando servidor");
        })
      .
        on('cresh',()=>{
            console.log("aplicacion caida");
            nodemon.emit('restart',5);
        })
});

gulp.task('browser-sync',['nodemon'],()=>{
    browserSync.init(null,{
        proxy: "http://localhost:3001",
        files:["./**/*.*"],
        browser: "google chrome",
        port:7002
    });
});



