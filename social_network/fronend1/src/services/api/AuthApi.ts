import { axios } from '../../core/axios';
import { LoginFormPropsInterface } from '../../pages/SignIn/components/LoginModal';
import { RegisterFormPropsInterface } from '../../pages/SignIn/components/RegisterModal';

interface ResponseAuthApiInterface {
    status: string;
    data: any;
}

export const AuthApi = {
    //@ts-ignore
    async signIn(postData: LoginFormPropsInterface): Promise<ResponseAuthApiInterface> {
        try {
            const {data} = await axios.post<ResponseAuthApiInterface>('http://localhost:8080/auth/login', { username: postData.email, password: postData.password });
            return data;
        } catch (error) {
            console.log('error in AuthApi');
        }
    },

    //@ts-ignore
    async signUp(postData: RegisterFormPropsInterface): Promise<ResponseAuthApiInterface> {
        try {
            const {data} = await axios.post<ResponseAuthApiInterface>('http://localhost:8080/auth/register', { email: postData.email, username: postData.username, fullname: postData.fullname, password: postData.password, password2: postData.password2 });
            return data;
        } catch (error) {
            console.log('error in AuthApi');
        }
    },

    //@ts-ignore
    async signUpGoogle(postData: RegisterFormPropsInterface): Promise<ResponseAuthApiInterface> {
        try {
            const {data} = await axios.post<ResponseAuthApiInterface>('http://localhost:8080/auth/google', { email: postData.email, username: postData.username, fullname: postData.fullname, avatarUrl: postData.avatarUrl });
            return data;
        } catch (error) {
            console.log('error in AuthApi');
        }
        
    },

    async getMe() {
        try {
            const {data} = await axios.get('http://localhost:8080/users/me');
            return data;   
        } catch (error) {
            console.log('error in AuthApi');
        }
    },

    //@ts-ignore
    async getUserInfo(userId: string): Promise<ResponseAuthApiInterface> {
        try {
            const {data} = await axios.get('http://localhost:8080/users/' + userId);
            return data;
        } catch (error) {
            console.log('error in AuthApi');
        }
    }
}

//@ts-ignore
window.AuthApi = AuthApi;
