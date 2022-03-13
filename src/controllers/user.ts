import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import UserModel from '../models/user';

const user_model = new UserModel();
export const create_user = async (
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

export const get_users = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await user_model.index();
        res.json({
            message: 'succeed',
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

export const get_a_user = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user_id = String(req.params.id);
        const user = await user_model.show(user_id);
        res.json({
            message: 'get a user succeed',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const edit_user = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updated_user = await user_model.update(req.body);
        res.json({
            message: 'you had been updated',
            data: updated_user,
        });
    } catch (error) {
        next(error);
    }
};

export const delete_user = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user_id = String(req.params.id);
        const deleted_user = await user_model.delete(user_id);
        res.json({
            message: 'user had been deleted',
            data: deleted_user,
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        const user = await user_model.login(email, password);
        const token = jwt.sign({ user }, config.token_secret);
        if (!user) {
            res.json({
                status: 'succeed',
                message: 'email or password incorrect',
            });
        }
        res.json({
            status: 'succeed',
            message: 'logged in',
            data: { ...user, token },
        });
    } catch (error) {
        next(error);
    }
};
