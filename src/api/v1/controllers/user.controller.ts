import { ControllerFunction } from '../../../../ts-coverage';
import { UserHandler } from './../handlers/user.handler';

export namespace UserController {

    export const signUser: ControllerFunction = (req, res, next) => {
        const user = req['user'];
        if(!user) { return next(new Error('failed to find user.')); } // unnecessary

        UserHandler.signUser({user}, (err, result) => {
            if (err) {
                return next(err);
            }
            return res.status(200).send(result);
        })
    }

    export const getUserProfileData: ControllerFunction = (req, res, next) => {
        const user = req['user']; 
        if(!user) { return next(new Error('failed to find user.')); } // unnecessary
        
        UserHandler.getUserProfileData(user.uid, (err, result) => {
            if (err) {
                return next(err);
            }
            return res.status(200).send(result);
        })
    }
}
