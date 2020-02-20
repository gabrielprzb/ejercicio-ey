const   fs      = require('fs'),
        path    = require('path'),
        express = require('express');

class Router {

    constructor() {
        this.startFolder = null;
    }

    //Llamado una vez durante el inicio del servidor
    load(app, folderName) {
        

        if (!this.startFolder) this.startFolder = path.basename(folderName);

        fs.readdirSync(folderName).forEach((file) => {

            const fullName = path.join(folderName, file);
            const stat = fs.lstatSync(fullName);

            if (stat.isDirectory()) {
                //Moverse recursivamente sobre los folders en ./controllers
                this.load(app, fullName);
            } else if (file.toLowerCase().indexOf('.js')) {
                
                //Agarra el path de el archivo de Javascript y utilizarlo para contruir la ruta
                let dirs = path.dirname(fullName).split(path.sep);

                if (dirs[0].toLowerCase() === this.startFolder.toLowerCase()) {
                    dirs.splice(0, 1);
                }

                const router = express.Router();
                //Generar la ruta
                const baseRoute = '/' + dirs.join('/');
                
                console.log('Created route: ' + baseRoute + ' for ' + fullName);

                //Cargar el archivo de JavaScript ("controller") y pasarle el router
                const controllerClass = require('../' + fullName);
                const controller = new controllerClass(router);
                //Asociar la route con el router
                app.use(baseRoute, router);
            }
        });
    }

}

module.exports = new Router();






