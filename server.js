
const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    router = require('./routes/router'),
    app = express(),
    http = require('http').createServer(app),
port = process.env.PORT || 3000;


class Server {

    constructor() {
        this.initExpressMiddleWare(); //inicializaciñon de middlewares
        this.mongoConnection(); //conexión a MongoDB
        this.initRoutes(); //inicializaciñon de rutas de
        this.start(); //inicialización de servidor

    }


    start() {
        http.listen(port, () => {
            console.log("Express server is listening on port", port);
        })

    }

    mongoConnection() {
     

        var mongodbUri = `mongodb://gabrielprzb:gabriel93@ds051007.mlab.com:51007/ey`;
        mongoose.connect(mongodbUri);
        var db = mongoose.connection;
        // mongo error
        db.on('error', console.error.bind(console, 'connection error:'));

    }

    initExpressMiddleWare() {
        app.use(express.static(__dirname + '/dist/exercise-ey'));
        app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));
        app.use(bodyParser.json({ limit: '1mb' }));


         // enable cors
         var corsOption = {
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            allowedHeaders: 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With',
            optionsSuccessStatus: 204,
            maxAge: 86400,
            credentials: false
        };
        app.options('*', cors(corsOption));
        app.use(cors(corsOption));

        //error handling
        app.use(function (err, req, res, next) {
            res.status(err.status || 500).send({ error: err });
        });

    }

    initRoutes() {

        router.load(app, './controllers');
        app.all('/*', (req, res) => {
            res.sendFile(__dirname + '/dist/index.html');
        });

    }
}

var server = new Server();