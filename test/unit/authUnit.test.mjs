import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginUser } from '../services/auth-login.mjs';


describe('AuthService - loginUser', () => {

    let dbStub;

    beforeEach(() => {
        const db = { query: async () => {} }; 
        dbStub = sinon.stub(db, 'query');  
    });

    afterEach(() => {
        dbStub.restore();
    });

    it('should throw an error if user does not exist', async () => {
        dbStub.resolves([[]]);

        try {
            await loginUser('nonexistent', 'password');
            throw new Error('Expected error was not thrown');
        } catch (error) {
            expect(error.message).to.equal('User does not exist');
        }
    });

    it('should throw an error if password is incorrect', async () => {
        dbStub.resolves([[{ username: 'testuser', password: 'hashedpassword' }]]);
        sinon.stub(bcrypt, 'compare').resolves(false);

        try {
            await loginUser('testuser', 'wrongpassword');
            throw new Error('Expected error was not thrown');
        } catch (error) {
            expect(error.message).to.equal('Invalid email or password');
        }

        bcrypt.compare.restore();
    });

    it('should return a token if login is successful', async () => {
        dbStub.resolves([[{ username: 'testuser', password: 'hashedpassword' }]]);
        sinon.stub(bcrypt, 'compare').resolves(true);
        sinon.stub(jwt, 'sign').returns('token');

        const token = await loginUser('testuser', 'password');
        expect(token).to.equal('token');

        bcrypt.compare.restore();
        jwt.sign.restore();
    });
});
