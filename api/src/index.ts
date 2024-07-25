import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";

// import db from './database/models';

import config from './config/config';
// import { RouterV1 } from './routes';
import axios from 'axios';

class Server {
    private app: Express;
    private module: number;

    constructor() {
        this.app = express();
        this.module = 1;
        this.startServer();
    }

    private middleware() {
        this.app.use(bodyParser.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        // Enable cors
        this.app.use(cors());
    }

    private apiRules() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );

        if (req.method == "OPTIONS") {
            res.header(
            "Access-Control-Allow-Methods",
            "PUT, POST, PATCH, DELETE, GET"
            );
            return res.status(200).json({});
        }

        next();
        });
    }

    private healthCheck() {
        this.app.get("/ping", (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json({ message: "pong" });
        });
    }

    private errorHandling() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
        const error = new Error("Route not found");


        return res.status(404).json({
                message: error.message,
                error: { module: this.module, value: 2 },
            });
        });
    }

    private startHttpServer() {
        http.createServer(this.app).listen(config.server.port, () => {
            console.info(`Server is running on port ${config.server.port}`);
        });
    }


    private runDatabase() {
        // db.sequelize
        // .sync()
        // .then(() => {
        //     console.info(`Database connected`);
        // })
        // .catch((error:any) => {
        //     console.error(error.message);
        // });
    }

    private routes() {
        // const routerv1 = new RouterV1();
        // this.app.use('/v1', routerv1.getRouter());
    }

    private startServer() {

        /** Connect Database */
        this.runDatabase();
    
        /** Middleware */
        this.middleware();
    
        /** Rules of our API */
        this.apiRules();
    
        /** Routes */
        this.routes();
    
        /** Healthcheck */
        this.healthCheck();
    
        /** Error handling */
        this.errorHandling();
    
        /** Start http server */
        this.startHttpServer();
      }
}

new Server();