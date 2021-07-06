const { expect } = require('chai');
const addContext = require('mochawesome/addContext');
let chai = require('chai');
let chaiHttp = require('chai-http');
let data = require('./data');
chai.use(chaiHttp);


var url = data.url;
var userdata = data.userdata();
var userID;
var token;

describe('User actions',function(){
    it('Register the user',function(done){

        chai.request(url)
        .post('/Account/v1/User')
        .send(userdata)
        .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.username).to.equal(userdata.userName);
            console.log(res.body);
            userID = res.body.userID;
            addContext(this,JSON.stringify(res.body));
            done();
            if(err){
                done(err);
            }
        });

    });

    it('Generate Token',(done)=>{

        chai.request(url)
        .post('/Account/v1/GenerateToken')
        .send(userdata)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            console.log(res.body);
            token = 'Bearer '+res.body.token;
            done();
            if(err){
                done(err);
            }
        });

    });

    it('Get user data',(done)=>{

        chai.request(url)
        .get('/Account/v1/User/'+userID)
        .set('Authorization',token)
        .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.username).to.equal(userdata.userName);
            console.log(res.body);
            done();
            if(err){
                done(err);
            }
        });

    });

    it('Delete user data',(done)=>{

        chai.request(url)
        .delete('/Account/v1/User/'+userID)
        .set('Authorization',token)
        .end((err, res) => {
            expect(res.status).to.equal(204);
            console.log(res.body);
            done();
            if(err){
                done(err);
            }
        });

    });
});