const fs = require('fs');

let listadoPorHacer = [];

//Esto es una función
const crear = (descripcion) => {

    //Cargamos la Base de datos, si está vacio creamos un objeto, si no, cargamos lo que haya en el archivo data.json
    cargarDB();

    //Creo un objeto que representará la tarea que se debe hacer y que se subira a la base de datos (ahora a un simple array)
    let porHacer = {
        descripcion: descripcion,
        completado: false
    }

    //Meto la tarea en el array (Esto más adelante sería una base de datos)
    listadoPorHacer.push(porHacer);

    //Guardo la tarea en el archivo data.json (se sobrescribe)
    guardarDB();

    return porHacer; //Esto es para tener algo que nos muestre lo que se acaba de crear.
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}


const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    //si la variable index es -1 es que no lo ha encontrado.
    if (index >= 0) {

        listadoPorHacer[index].completado = completado;

        guardarDB();
        return true; //Esto es como para decir que la tarea se hizo correctamente.
    } else {
        return false;
    }
}

const borrarTarea = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        
        if (listadoPorHacer.splice(index, 1)) {
            console.log("Ha eliminado la tarea: "+index);
            guardarDB();
            return true;
        }
    } else {
        return false;
    }


}

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar la tarea', err);
        console.log('¡La base de datos ha sido guardada!');
    });

}

const cargarDB = () => {

    try {
        //Como estamos en un lenguaje que es del lado del servidor, podemos hacer una petición require y al cargar ese archivo lo detecta como json y lo serializa convirtiendolo en un objeto de javascript por nosotros:
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrarTarea
}