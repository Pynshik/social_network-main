import React from 'react';
import { useStylesSignIn } from '../index';
import { ModalBlock } from '../../../components/ModalBlock';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { fetchSignUp } from '../../../store/ducks/user/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserLoadingStatus } from '../../../store/ducks/user/selector';
import { LoadingStatus } from '../../../store/types';

interface RegisterModalPropsInterface {
    open: boolean;
    onClose: () => void;
}

export interface RegisterFormPropsInterface {
    fullname: string;
    username: string;
    email: string;
    password: string;
    password2: string;
    avatarUrl?: string; 
}

const RegisterFormSchema = yup.object().shape({
    fullname: yup.string().required('Введите имя').min(10, 'Минимальная длина 10 символов'),
    username: yup.string().required('Введите логин').min(10, 'Минимальная длина 10 символов'),
    email: yup.string().email('Неверная почта').required('Введите почту').min(10, 'Минимальная длина 10 символов'),
    password: yup.string().min(6, 'Минимальная длина пароля 6 символов').required(),
    password2: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export const RegisterModal: React.FC<RegisterModalPropsInterface> = ({ open, onClose }): React.ReactElement => {
    const classes = useStylesSignIn();
    const dispatch = useDispatch();
    const loadingStatus = useSelector(selectUserLoadingStatus)
    const { control, handleSubmit, errors } = useForm<RegisterFormPropsInterface>({
        resolver: yupResolver(RegisterFormSchema)
    });

    const onSubmit = async (data: RegisterFormPropsInterface) => {
        try {
            dispatch(fetchSignUp(data));   
        } catch (error) {
            console.log('error in RegisterModal');
        }
    };

    return (
        <ModalBlock
                        visible={open}
                        onClose={onClose}
                        classes={classes}
                        title="Создат учётную запись">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                                <FormGroup aria-label="position" row>
                                    <Controller
                                        as={TextField}
                                        control={control}
                                        name="email"
                                        className={classes.registerField}
                                        autoFocus
                                        id="email"
                                        label="Email"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="filled"
                                        type="email"
                                        defaultValue=""
                                        helperText={errors.email?.message}
                                        error={!!errors.email}
                                        fullWidth
                                    />
                                    <Controller
                                        as={TextField}
                                        control={control}
                                        name="username"
                                        className={classes.registerField}
                                        id="username"
                                        label="Логин"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="filled"
                                        type="text"
                                        defaultValue=""
                                        helperText={errors.username?.message}
                                        error={!!errors.username}
                                        fullWidth
                                    />
                                    <Controller
                                        as={TextField}
                                        control={control}
                                        name="fullname"
                                        className={classes.registerField}
                                        id="fullname"
                                        label="Имя"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="filled"
                                        type="text"
                                        defaultValue=""
                                        helperText={errors.fullname?.message}
                                        error={!!errors.fullname}
                                        fullWidth
                                    />
                                    <Controller
                                        as={TextField}
                                        control={control}
                                        name="password"
                                        className={classes.registerField}
                                        id="password"
                                        label="Пароль"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="filled"
                                        type="password"
                                        defaultValue=""
                                        helperText={errors.password?.message}
                                        error={!!errors.password}
                                        fullWidth
                                    />
                                    <Controller
                                        as={TextField}
                                        control={control}
                                        name="password2"
                                        className={classes.registerField}
                                        id="password2"
                                        label="Пароль"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="filled"
                                        type="password"
                                        defaultValue=""
                                        helperText={errors.password2?.message}
                                        error={!!errors.password2}
                                        fullWidth
                                    />
                                    <Button disabled={loadingStatus === LoadingStatus.LOADING} type="submit" variant="contained" color="primary" fullWidth>
                                        Реистрация
                                    </Button>
                                </FormGroup>
                            </FormControl>
                        </form>
                    </ModalBlock>    
    )
}