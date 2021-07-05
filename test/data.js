var data = function(){

this.url ='https://demoqa.com';

this.userdata = function(){
  var dt = new Date();
  var user = {
    "userName": "abc"+dt.getTime(),
    "password": "Abcd@1234"
  };
  return user;
}

}

module.exports = new data();