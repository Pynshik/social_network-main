import express from 'express';
import * as yup from 'yup';

export const createTweetValidationSchema: any = yup.object().shape({
    text: yup.string().required('Текст является обязательным полем').max(280, 'Максимальная длина твита 280 символов'),
  });

export const validateTweet = (createTweetValidationSchema: any) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        await createTweetValidationSchema.validate(req.body);
        next();
    } catch (err) {
        res.status(400).send(`Это я, ${err}`);
    }
}