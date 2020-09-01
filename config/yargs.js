const argv=require('yargs')
    .command('crear', 'Crea una nueva tarea', {
        descripcion:{
            demand: true,
            alias: 'd',
            desc: 'Descripción de la tarea por hacer'
        }
    })
    .command('actualizar', 'Actualiza una tarea existente', {
        descripcion:{
            demand: true,
            alias: 'd',
            desc: 'Descripción de la tarea'
        }, 
        completado:{
            default: true,
            alias: 'c',
            desc: 'Actualización de la tarea indicada'
        }
    })
    .command('eliminar', 'Elimina una tarea', {
        descripcion:{
            demand: true,
            alias: 'd',
            desc: 'Eliminación de tarea'
        }
    })
    .help()
    .argv;

module.exports={
    argv
}