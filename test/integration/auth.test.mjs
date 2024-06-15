import { expect, use } from 'chai';
import chaiHttp from "chai-http";
import { describe, it } from 'mocha';
import app from '../../index.js';

const chai = use(chaiHttp);

describe('AUTH', () => {

    let authToken;

    it('should register a new user', (done) => {
        chai.request.execute(app)
            .post('/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                done();
            });
    });

    it('should login an existing user', (done) => {
        chai.request.execute(app)
            .post('/login')
            .send({ username: 'testuser', password: 'password' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                authToken = res.body.token;
                done();
            });
    });

    it('should retrieve user profile', (done) => {
        chai.request.execute(app)
            .get('/profile')
            .set('Cookie', `token=${authToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});