import express, { Router, RouterOptions, Request, Response } from "express";
import { AuthRouter, BudgetRouter, AccountRouter } from "./";

export class RouterV1 {
  private router: Router;

  constructor(options?: RouterOptions) {
    this.router = express.Router(options);

    this.initRoutes();
  }

  private initRoutes(): void {
    this.initAuthRoutes();
    this.initBudgetRoutes();
    this.initAccountRoutes();

    this.router.use("*", (req: Request, res: Response) => {
      const error = new Error('Route not found on V1');

      console.error(error.message);
      
      return res.status(404).json({
        message: error.message,
      })
    });
  }

  private initAuthRoutes(): void {
    const router = new AuthRouter();
    this.router.use("/auth", router.getRouter());
  }

  private initBudgetRoutes(): void {
    const router = new BudgetRouter();
    this.router.use("/budget", router.getRouter());
  }

  private initAccountRoutes(): void {
    const router = new AccountRouter();
    this.router.use("/account", router.getRouter());
  }

  public getRouter(): Router {
    return this.router;
  }
}