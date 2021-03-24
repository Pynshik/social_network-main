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
import { fetchSignIn } from '../../../store/ducks/user/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserLoadingStatus } from '../../../store/ducks/user/selector';
import { LoadingStatus } from '../../../store/types';

interface LoginModalPropsInterface {
    open: boolean;
    onClose: () => void;
}

export interface LoginFormPropsInterface {
    email: string;
    password: string;
}

const LoginFormSchema = yup.object().shape({
    email: yup.string().email('Неверная почта').required('Введите почту'),
    password: yup.string().min(6, 'Минимальная длина пароля 6 символов').required(),
});

export const LoginModal: React.FC<LoginModalPropsInterface> = ({ open, onClose }): React.ReactElement => {
    const classes = useStylesSignIn();
    const dispatch = useDispatch();
    const loadingStatus = useSelector(selectUserLoadingStatus)
    const { control, handleSubmit, errors } = useForm<LoginFormPropsInterface>({
        resolver: yupResolver(LoginFormSchema)
    });

    const onSubmit = async (data: LoginFormPropsInterface) => {
        try {
            dispatch(fetchSignIn(data));
        } catch (error) {
            console.log('error in LoginModal');
        }
    };

    return (
        <ModalBlock
            visible={open}
            onClose={onClose}
            classes={classes}
            title="Войти в Твиттер">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                    <FormGroup aria-label="position" row>
                        <Controller
                        as={TextField}
                        control={control}
                        name="email"
                            className={classes.loginSideField}
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
                            error={ !!errors.email}
                            fullWidth
                        />
                         <Controller
                            as={TextField}
                            control={control}
                            name="password"
                            className={classes.loginSideField}
                            id="password"
                            label="Пароль"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            type="password"
                            defaultValue=""
                            helperText={errors.password?.message}
                            error={ !!errors.password}
                            fullWidth
                        />
                        <Button disabled={loadingStatus === LoadingStatus.LOADING} type="submit" variant="contained" color="primary" fullWidth>
                            Войти
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </ModalBlock>
    )
}