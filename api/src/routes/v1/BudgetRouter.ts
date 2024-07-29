import express, { Router, Request, Response, RouterOptions } from "express";
import * as Auth from '../../middleware/auth';
import { ControllersV1 } from "../../controllers";
import { PermissionActionsEnum } from "../../library/enums";

export class BudgetRouter {
  private router: Router;

  constructor(options?: RouterOptions) {
    this.router = express.Router(options);

    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(
      '/createUserBudget',
      Auth.authorize([PermissionActionsEnum.Write]),
      ControllersV1.BudgetController.createUserBudget.validation,
      ControllersV1.BudgetController.createUserBudget.action,
    );

    this.router.get(
      '/getUserBudgets',
      Auth.authorize([PermissionActionsEnum.Read]),
      ControllersV1.BudgetController.getUserBudgets.validation,
      ControllersV1.BudgetController.getUserBudgets.action,
    );

    this.router.put(
      '/',
      Auth.authorize([PermissionActionsEnum.Update]),
      ControllersV1.BudgetController.updateBudget.validation,
      ControllersV1.BudgetController.updateBudget.action,
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