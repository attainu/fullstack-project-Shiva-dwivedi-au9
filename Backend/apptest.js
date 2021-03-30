let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect
chai.use(chaiHttp)

describe('Testing Api Health',() => {
    it('should return 200 for health',(done) => {
        chai.request(`https://corpenviro-backend.herokuapp.com`)
        .get('/')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) =>{
            throw err
        })
    })
})
describe('Testing Announcement Api',() => {
    it('should return 200 for health',(done) => {
        chai.request(`https://corpenviro-backend.herokuapp.com/api/auth`)
        .get('/Announcements')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) =>{
            throw err
        })
    })
})
describe('Testing Leaves Api',() => {
    it('should return 200 for health',(done) => {
        chai.request(`https://corpenviro-backend.herokuapp.com/api/auth`)
        .get('/leaverequests')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) =>{
            throw err
        })
    })
})
describe('Testing Allemployees Api',() => {
    it('should return 200 for health',(done) => {
        chai.request(`https://corpenviro-backend.herokuapp.com/api/auth`)
        .get('/Allemployees')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) =>{
            throw err
        })
    })
})
describe('Testing Task Api',() => {
    it('should return 200 for health',(done) => {
        chai.request(`https://corpenviro-backend.herokuapp.com/api/auth`)
        .get('/taskdetails')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) =>{
            throw err
        })
    })
})