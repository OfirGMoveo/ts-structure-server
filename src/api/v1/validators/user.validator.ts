import { ValidatorFunction } from '../../../ts-coverage';
import { AuthSandbox } from '../../../utils/auth-sandbox';
import * as debug from 'debug';
const error = debug('UserValidator:error');
const log = debug('UserValidator:log');

const authSandbox = AuthSandbox.getSingleSandbox();

export namespace UserValidator {

    export const validateAuthUser: ValidatorFunction = async (req, res, next) => {
        log(`validateAuthUser`);
    
        const token = req.header('x-auth'); // taking the token stored in x-auth header

        let userRecord;
        /*-- searching in firebase.auth the user by the idToken provided --*/
        try {
            userRecord = await authSandbox.getUserByTokenId(token);
            /*-- in any valid scenario (first-time user or old user) the user record must be stored --*/
            if(!userRecord) {
                return next(new Error('token verification failed')); 
            }
        } catch (error) {
            log(`token verification failed`);
            return next(error);
        }
    
        try {
            if (!userRecord) {
                log('token verification failed');
                throw new Error('token verification failed');
            }
            /*--  attaching the found user record and incoming token to the req for future access --*/
            req['user'] = userRecord;
            req['token'] = token;
    
            log(`validateAuthUser`, `Exit`);
            return next();
    
        } catch (error) {
            error(`validateAuthUser`, error);
            return next(error);
        }
    }

    export const validateGetUserProfileData: ValidatorFunction = (req, res, next) => {
        
        next();
    }
}
