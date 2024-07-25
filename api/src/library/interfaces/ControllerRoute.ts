import { Request, Response, NextFunction } from "express";

export interface ControllerRoute {
    action: (req: Request, res: Response, next: NextFunction) => any;
    validation: any;
}