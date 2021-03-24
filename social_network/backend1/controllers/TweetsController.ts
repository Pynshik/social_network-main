import express from "express";
import { TweetModel } from "../models/TweetModel";
import { UserModelInterface } from "../models/UserModel";
import { isValidObjectId } from "../utils/isValidObjectId";

export const saltRounds = 10;

class TweetController {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const tweets = await TweetModel.find({}).populate('user').sort({'createdAt': '-1'}).exec();

      res.json({
        status: "success",
        data: tweets,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error,
      });
    }
  }

  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const tweetId = req.params.id;

      if (!isValidObjectId(tweetId)) {
        res.status(404).send();
        return;
      }

      const tweet = await TweetModel.findById(tweetId).populate('user').exec();

      if (!tweet) {
        res.status(404).send();
        return;
      }

      res.json({
        status: "success",
        data: tweet,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async getUserTweets(req: express.Request, res: express.Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!isValidObjectId(userId)) {
        res.status(400).send();
        return;
      }

      //@ts-ignore
      const tweet = await TweetModel.find({ user: userId }).populate('user').exec();

      if (!tweet) {
        res.status(404).send();
        return;
      }

      res.json({
        status: "success",
        data: tweet,
      });

    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async create(req: any, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelInterface;

      if (user?._id) {
        const data: any = {
          text: req.body.text,
          images: req.body.images,
          user: user._id,
        };

        const tweet = await TweetModel.create(data);

        if(user.tweets){
          user.tweets.push(tweet._id);
        };

        res.json({
          status: "success",
          data: await tweet.populate('user').execPopulate(),
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "error",
      });
    }
  }

  async delete(req: any, res: express.Response): Promise<void> {
    const user = req.user as UserModelInterface;

    try {
      if (user) {
        const tweetId = req.params.id;

        if (!isValidObjectId(tweetId)) {
          res.status(400).send();
          return;
        }

        const tweet = await TweetModel.findById(tweetId);

        if (tweet) {
          if (String(tweet.user._id) === String(user._id)) {
            tweet.remove();
            res.send();
          } else {
            res.status(403).send();
          }
        } else {
          res.status(404).send();
        }
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "error",
      });
    }
  }

  async update(req: any, res: express.Response): Promise<void> {
    const user = req.user as UserModelInterface;

    try {
      if (user) {
        const tweetId = req.params.id;

        if (!isValidObjectId(tweetId)) {
          res.status(400).send();
          return;
        }

        const tweet = await TweetModel.findById(tweetId);

        if (tweet) {
          if (String(tweet.user._id) === String(user._id)) {
            const text = req.body.text;
            tweet.text = text;
            tweet.save();
            res.send();
          } else {
            res.status(403).send();
          }
        } else {
          res.status(404).send();
        }
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "error",
      });
    }
  }
 
  async searchTweets(req: any, res: express.Response): Promise<void> {
    try {
      const tweets = await TweetModel.find({"text": {$regex: req.query.q, $options: 'i'}}).populate('user').exec();

      res.json({
        status: "success",
        data: tweets,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error,
      });
    }
  }

}

export const TweetCntrl = new TweetController();
