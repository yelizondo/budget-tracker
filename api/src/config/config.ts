import dotenv from "dotenv";

dotenv.config();

const config = {
    server: {
        port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 4000
    }
};

export default config;