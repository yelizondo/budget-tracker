import { environment as prodEnvironment } from '../../environments/production.environtment';
import { environment as devEnvironment } from '../../environments/dev.environtment';
import { environment as testEnvironment } from '../../environments/test.environtment';
import { EnvironmentDTO } from '../DTOs';

export class ConfigHandler {
    static getConfig = (): EnvironmentDTO => {
        if (process.env.NODE_ENV === 'production') {
            return prodEnvironment;
        } else if (process.env.NODE_ENV === 'test') {
            return testEnvironment;
        } else {
            return devEnvironment;
        }
    }
}