import express, { Router, RouterOptions, Request, Response } from "express";
import { AuthRouter } from "./";

export class RouterV1 {
  private router: Router;

  constructor(options?: RouterOptions) {
    this.router = express.Router(options);

    this.initRoutes();
  }

  private initRoutes(): void {
    this.initAuthRoutes();
    // this.initUserRoutes();

    this.router.use("*", (req: Request, res: Response) => {
      const error = new Error('Route not found on V1');

      console.error(error.message);
      
      return res.status(404).json({
        message: error.message,
      })
    });
  }

  private initAuthRoutes(): void {
    const authRouter = new AuthRouter();
    this.router.use("/auth", authRouter.getRouter());
  }

//   private initUserRoutes(): void {
//     const userRouter = new UserRouter();
//     this.router.use("/users", userRouter.getRouter());
//   }

  public getRouter(): Router {
    return this.router;
  }
}