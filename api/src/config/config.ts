import dotenv from "dotenv";

dotenv.config();

const config = {
    server: {
        port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 4000
    },
    database: {
        host: process.env.DATABASE_HOST ? process.env.DATABASE_HOST : 'postgres',
        port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 5432,
        name: process.env.POSTGRES_DB ? process.env.POSTGRES_DB : 'budget',
        user: process.env.POSTGRES_USER ? process.env.POSTGRES_USER : 'budget',
        password: process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD : 'budget',
        dialect: 'postgres',
    },
    jwt: {
        expiresInSeconds: 3600
    }
};

export default config;