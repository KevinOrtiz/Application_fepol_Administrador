let index = require('./controller/controllerIndex');
let ayudantias = require('./controller/controllerAyudantias');
let profesor = require('./controller/controllerAyudantes');
let cursos = require('./controller/controllerCursos');
let estudiantes = require('./controller/controllerEstudiantes');
let materias = require('./controller/controllerMaterias');


module.exports = (app)=>{
 //Definimos las directrices del direccionamiento
    app.get('/',index.index);
    app.get('/cursos',cursos.indexCursos);
    app.get('/ayudantias',ayudantias.indexAyudantia);
    app.get('/estudiantes',estudiantes.indexEstudiantes);
    app.get('/materias',materias.indexMaterias);
    app.get('/profesor',profesor.indexAyudantes);
    
};