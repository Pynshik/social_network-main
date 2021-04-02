import {UserCntrl} from '../UserController';
import {UserModel} from '../../models/UserModel';

describe('User controller', () => {
    const  req = {};
    const res = {};

    it('User Controller index function should have been called', () => {
        const indexMock = jest.spyOn(UserCntrl, 'index');
        indexMock.mockImplementation(() => "mock");

        expect(UserCntrl.index(req,res)).toEqual('mock');
        expect(indexMock).toHaveBeenCalled();
        expect(indexMock).toHaveBeenCalledWith(req, res);
    });

    it('User Controller show function should have been called', () => {
        const showMock = jest.spyOn(UserCntrl, 'show');
        showMock.mockImplementation(() => "show");

        expect(UserCntrl.show(req,res)).toEqual('show');
        expect(showMock).toHaveBeenCalled();
        expect(showMock).toHaveBeenCalledWith(req, res);
    });

    it('User Controller create function should have been called', () => {
        const createMock = jest.spyOn(UserCntrl, 'create');
        createMock.mockImplementation(() => "create");

        expect(UserCntrl.create(req,res)).toEqual('create');
        expect(createMock).toHaveBeenCalled();
        expect(createMock).toHaveBeenCalledWith(req, res);
    });

    it('User Controller afterLogin function should have been called', () => {
        const afterLoginMock = jest.spyOn(UserCntrl, 'afterLogin');
        afterLoginMock.mockImplementation(() => "afterLogin");

        expect(UserCntrl.afterLogin(req,res)).toEqual('afterLogin');
        expect(afterLoginMock).toHaveBeenCalled();
        expect(afterLoginMock).toHaveBeenCalledWith(req, res);
    });

    it('User Controller createGoogle function should have been called', () => {
        const createGoogleMock = jest.spyOn(UserCntrl, 'createGoogle');
        createGoogleMock.mockImplementation(() => "createGoogle");

        expect(UserCntrl.createGoogle(req,res)).toEqual('createGoogle');
        expect(createGoogleMock).toHaveBeenCalled();
        expect(createGoogleMock).toHaveBeenCalledWith(req, res);
    });

    it('User Controller getUserInfo function should have been called', () => {
        const getUserInfoMock = jest.spyOn(UserCntrl, 'getUserInfo');
        getUserInfoMock.mockImplementation(() => "getUserInfo");

        expect(UserCntrl.getUserInfo(req,res)).toEqual('getUserInfo');
        expect(getUserInfoMock).toHaveBeenCalled();
        expect(getUserInfoMock).toHaveBeenCalledWith(req, res);
    });
})