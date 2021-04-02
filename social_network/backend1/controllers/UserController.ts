import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel, UserModelDocumentInterface, UserModelInterface } from "../models/UserModel";
import {isValidObjectId} from '../utils/isValidObjectId';

export const saltRounds = 10;

class UserController {
  async index(
    _: any,
    res: express.Response
  ): Promise<void> {

      const users = await UserModel.find({}).exec();

      res.json({
        status: "success",
        data: users,
      });
  }

  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!isValidObjectId(userId)) {
        return;
      }

      const user = await UserModel.findById(userId).exec();

      if (!user) {
        return;
      }

      res.status(200).json({
        status: "success",
        data: user,
      });

    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const newPassword: string = await bcrypt.hash(
        req.body.password,
        saltRounds
      );

      if (!newPassword) {
        return;
      }

      const data: UserModelInterface = {
        email: req.body.email,
        fullname: req.body.fullname,
        username: req.body.username,
        password: newPassword,
      };

      const user = await UserModel.create(data);
      res.status(201).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async afterLogin(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user ? (req.user as UserModelDocumentInterface).toJSON() : undefined;
      res.status(200).json({
        status: "success",
        data: {
          ...user,
          token: jwt.sign({data: req.user}, '26hgKWUB6kdbSjS', 
            {expiresIn: '30 days'}),
        },
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async createGoogle(req: express.Request, res: express.Response): Promise<void> {
    try {
      const existUser = await UserModel.findOne({email: req.body.email}).exec();
      if(existUser) {
        res.status(200).json({
          status: "success",
          data: {
            ...existUser.toJSON(),
            token: jwt.sign({data: existUser}, '26hgKWUB6kdbSjS', 
              {expiresIn: '30 days'}),
          }
        });
        return;
      }

      const data: UserModelInterface = {
        email: req.body.email,
        fullname: req.body.fullname,
        username: req.body.username,
        avatarUrl: req.body.avatarUrl,
      };

      const user = await UserModel.create(data);
      
      res.json({
        status: "success",
        data: {
          ...user.toJSON(),
          token: jwt.sign({data: user}, '26hgKWUB6kdbSjS', 
            {expiresIn: '30 days'}),
        },
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getUserInfo(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user ? (req.user as UserModelDocumentInterface).toJSON(): undefined;
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export const UserCntrl = new UserController();
