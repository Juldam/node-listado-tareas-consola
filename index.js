//REQUIRES
//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;
require('colors');
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        console.log('===================='.green);
        console.log('==LISTADO DE TAREAS='.green);
        console.log('===================='.green);
        for (let tarea of listado) {
            console.log('====================')
            console.log(tarea.descripcion);
            //console.log('Completado : '+tarea.completado);
            if (tarea.completado) console.log('Completado: Realizado');
            else console.log('Completado: Pendiente');
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, JSON.parse(argv.completado)); //El JSON.parse lo utilizo porque si no el argv.completado es un string ("false"), en vez de un booleano (false)
        if (actualizado) console.log('Tarea actualizada');
        else console.log('No se pudo actualizar la tarea');
        break;

    case 'eliminar':
        let borrado = porHacer.borrarTarea(argv.descripcion);
        if (borrado) console.log('Tarea borrada'.red);
        else console.log('No se pudo eliminar la tarea'.red);
        break;
    default:
        console.log('Comando no reconocido');
}