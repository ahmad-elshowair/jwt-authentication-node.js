import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user';

const user_model = new UserModel();
export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await user_model.create(req.body);
        res.status(200).json({
            message: 'the have been created successfully',
            data: { ...user },
        });
    } catch (error) {
        next(error);
    }
};
