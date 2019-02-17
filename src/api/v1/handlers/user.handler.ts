import { auth } from 'firebase-admin';
import { HandlerFunction } from '../../../../ts-coverage';
import { DbSandbox } from './../../../utils/db-sandbox';
import { IUserModel } from './../../../db/models';

export namespace UserHandler {

    export const signUser: HandlerFunction<{user : auth.UserRecord}, {user: IUserModel}> = (params, cb) => {
        DbSandbox.signUser(params.user)
            .then((res) => cb(null, {user: res}))
            .catch(err => cb(err, null));
    }

    export const getUserProfileData: HandlerFunction<string, {user: IUserModel}> = (uid, cb) => {
        DbSandbox.getUserProfileData(uid)
            .then((res) => cb(null, {user: res}))
            .catch(err => cb(err, null));
    }
}
