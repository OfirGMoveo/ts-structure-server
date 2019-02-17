import * as supertest from 'supertest';
import * as request from 'request';
import * as config from 'config';
import { before } from 'mocha';
import { expect } from 'chai';

import { app } from '../../src/app';
import { AuthSandbox } from '../../src/utils/auth-sandbox';

const API_VERSION = 'v1';
const API_KEY = config.get('TESTING_API_KEY') as string;
const TESTING_UID = 'Efyoh7QD6JcWpn7SWtYBqR5WSlt2';
const TESTING_EMAIL = 'test.user@test.com';

function getSecuredIdTokenFromUid(uid: string, done: Mocha.Done, cb: (err, res, body)=>void) {
    AuthSandbox.getSingleSandbox();
    AuthSandbox.createIdTokenFromUid(uid)
    .then(customToken => { 
        request({
            url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${API_KEY}`,
            method: 'POST',
            body: {
              token: customToken,
              returnSecureToken: true
            },
            json: true,
          }, cb);
    })
    .catch(err => done(err));
}

describe('AuthSandbox : sign user', function() {
    let testingIdToken: string;
    before(function(done) {
        getSecuredIdTokenFromUid(TESTING_UID, done, (err, res, body) => {
            testingIdToken = body.idToken;
            done(err);
        })
    });

    it('should sign user and return shallow profile', function(done) {
        supertest(app).post(`/api/${API_VERSION}/user/sign`)
        .set('x-auth', testingIdToken)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
            expect(res.body).to.have.property('user');
            expect(res.body.user.uid).to.be.equal(TESTING_UID);
            expect(res.body.user).to.contain.keys([
                'email', 'level', 'favoriteList', 'markedList'
            ]);
            expect(res.body.user.email).to.be.equal(TESTING_EMAIL);
            done(err);
        });
    })
})


// describe('db-sandbox user', function() {
//     it('should return populated user profile', function(done) {
        
//     })
// })