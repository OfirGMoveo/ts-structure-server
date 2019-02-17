
import { ObjectID } from 'mongodb';
import { User, IUserModel } from './../db/models';
import { auth } from 'firebase-admin';

export interface PageOptions { skip: number, limit: number }
export interface SortOptions { by: ('popularity' | 'alfa'), order: 1 | -1 }

export class DbSandbox {

    // #region - user
    /**
     * UseCases : 
     *  * check if the user is new or not (if its the first sign-in add the user to db).
     *  * find the user in authenticated routes.
     * */
    private static async findUserByUID(uid: string) {
        const matchedUser = await User.aggregate([{$match: { _id: uid }}]);
        return matchedUser.length > 0 ? (matchedUser[0] as IUserModel) : undefined;
    }

    private static async createUser(userRecord: auth.UserRecord) {
        const {email, uid, displayName} = userRecord;
        const user = new User({ email, uid, name: (displayName || 'NO_NAME')  });
        return await user.save({});
    }

    public static async signUser(userRecord: auth.UserRecord) {
        let user = await this.findUserByUID(userRecord.uid); 
        if(!user) {
            user = await this.createUser(userRecord);
        }
        return user;
    }

    public static async getUserProfileData(uid: string) {
        const user = await this.findUserByUID(uid); 
        const populatedUser = await user.populate({ path: 'favoriteList markedList', populate: { path: 'author'} }).execPopulate();
        return populatedUser;
    }
    // #endregion


}

