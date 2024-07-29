import express, { Router, Request, Response, RouterOptions } from "express";
import * as Auth from '../../middleware/auth';
import { ControllersV1 } from "../../controllers";
import { PermissionActionsEnum } from "../../library/enums";

export class AuthRouter {
  private router: Router;

  constructor(options?: RouterOptions) {
    this.router = express.Router(options);

    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(
      '/signup',
      ControllersV1.AuthController.signup.validation,
      ControllersV1.AuthController.signup.action,
    );

    this.router.post(
      '/login',
      ControllersV1.AuthController.login.validation,
      ControllersV1.AuthController.login.action,
    );

    // this.router.get(
    //   '/',
    //   Auth.authorize([PermissionActionsEnum.Read]),
    //   UserController.getUsers.validation,
    //   UserController.getUsers.action

    // );

    this.router.post(
      '/refresh-token',
      Auth.authorize([PermissionActionsEnum.Update]),
      Auth.refreshAuthToken()
    );

    this.router.get(
      '*',
      (req: Request, res: Response) => {
        const error = new Error('Route does not exist for Auth');

        console.error(error.message);

        res.status(404).json({
            message: error.message,
        });
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}