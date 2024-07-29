import express, { Router, Request, Response, RouterOptions } from "express";
import * as Auth from '../../middleware/auth';
import { ControllersV1 } from "../../controllers";
import { PermissionActionsEnum } from "../../library/enums";

export class AccountRouter {
  private router: Router;

  constructor(options?: RouterOptions) {
    this.router = express.Router(options);

    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(
      '/',
      Auth.authorize([PermissionActionsEnum.Write]),
      ControllersV1.AccountController.createAccount.validation,
      ControllersV1.AccountController.createAccount.action,
    );

    this.router.get(
      '*',
      (req: Request, res: Response) => {
        const error = new Error('Route does not exist for Account');

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