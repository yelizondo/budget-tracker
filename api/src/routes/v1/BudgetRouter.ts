import express, { Router, Request, Response, RouterOptions } from "express";
import * as Auth from '../../middleware/auth';
import { AuthController, BudgetController } from "../../controllers";
import { PermissionActionsEnum } from "../../library/enums";

export class BudgetRouter {
  private router: Router;

  constructor(options?: RouterOptions) {
    this.router = express.Router(options);

    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(
      '/create',
      Auth.authorize([PermissionActionsEnum.Write]),
      BudgetController.createBudget.validation,
      BudgetController.createBudget.action,
    );

    this.router.get(
      '*',
      (req: Request, res: Response) => {
        const error = new Error('Route does not exist for Budget');

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