import express from 'express';
import * as yup from 'yup';

export const registerValidationSchema: any = yup.object().shape({
    email: yup.string().email('Введите Email').required('Email является обязательным полем').min(10, 'Длина Email должна быть больше 10 символов').max(40, 'Длина Email должна быть меньше 40 символов'),
    fullname: yup.string().required('Имя является обязательным полем').min(10, 'Минимальная длина имени: 10 символов').max(40, 'Максимальная длина имени: 40 символов'),
    username: yup.string().required('Логин является обязательным полем').min(10, 'Минимальная длина логина: 10 символов').max(40, 'Максимальная длина логина: 40 символов'),
    password: yup.string().required('Пароль является обязательным полем').min(6, 'Минимальная длина пароля: 6 символов'),
    password2: yup.string().required('Подтверждение пароля обязательно').oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
  });

export const validate = (registerValidationSchema: any) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        await registerValidationSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        res.status(400).send(err.errors);
    }
}