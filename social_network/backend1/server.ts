import dotenv from 'dotenv';
import './core/db';

import express from "express";
import bodyParser from "body-parser";
import multer from 'multer';
import cors from "cors";
import {passport} from './core/passport';
import {registerValidationSchema, validate} from './validations/register';
import { UserCntrl } from "./controllers/UserController";
import { TweetCntrl } from './controllers/TweetsController';
import { createTweetValidationSchema, validateTweet} from './validations/createTweet';
import { UploadFilesCntrl } from './controllers/UploadFilesController';

dotenv.config();

const app: express.Application = express();
const port = 8080;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get('/', (req, res) => res.send('hello'));
app.get('/users', UserCntrl.index);
app.get('/users/me', passport.authenticate('jwt', { session: false }), UserCntrl.getUserInfo);
app.get('/users/:id', UserCntrl.show);

app.get('/tweets', TweetCntrl.index);
app.get('/tweets/search', TweetCntrl.searchTweets);
app.get('/tweets/:id', TweetCntrl.show);
app.get('/tweets/user/:id', TweetCntrl.getUserTweets);
app.delete('/tweets/:id', passport.authenticate('jwt'), TweetCntrl.delete);
app.post('/tweets', passport.authenticate('jwt'), validateTweet(createTweetValidationSchema),TweetCntrl.create);
app.patch('/tweets/:id', passport.authenticate('jwt'), validateTweet(createTweetValidationSchema),TweetCntrl.update);

app.post('/auth/google', UserCntrl.createGoogle);
app.post('/auth/register', validate(registerValidationSchema) , UserCntrl.create);
app.post('/auth/login', passport.authenticate('local'), UserCntrl.afterLogin);

app.post('/upload', upload.single('image'), UploadFilesCntrl.upload);

app.listen(port, '0.0.0.0', (): void => {
    console.log('SERVER IS RUNNING!');
});
