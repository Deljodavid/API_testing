const { expect } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');


chai.use(chaiHttp);
chai.use(require('chai-json-schema'));


var pagenum;

describe('/GET user data', () => {


    it('get all the data',(done) => {

        var schema = {
            "properties": {
                "page": {
                    "type":"number"
                },
                 "data": {
                    "type":"array"
                }
        
            },
            "required": [ "page","data"]
        };

        chai.request('https://reqres.in')
            .get('/api/users')
            .query({page:2})
            .end((err, res) => {
                expect(res.status).to.equal(200);
                pagenum = res.body.page;
                console.log(pagenum);
                expect(res.body).to.be.jsonSchema(schema);
                done();
                if(err){
                    done(err);
                }
            });
        });            

    it('ait should GET the user data', (done) => {
    
        myPromise(pagenum).then((res,e)=>{
            console.log(res.body);
            expect(res.body.data.email).to.equal('janet.weaver@reqres.in');
            done(); 
            if(e){
                done(e);
            }
        }).catch(function(err){
            done(err);
        })
           
        
    });
    

});


function myPromise(pagenum){
    return new Promise((resolve, reject) => {
        return chai.request('https://reqres.in')
           .get('/api/users/'+pagenum)
           .end((err, res) => {
                  if(err){
                    reject(err);
                  }
                  else
                  {
                    resolve(res);
                  }
           });
});

};