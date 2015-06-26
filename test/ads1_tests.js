var should = require('should'); 
var assert = require('assert');
var request = require('supertest'); 
var httpReq =  require('request'); 
 
describe('Routing', function() {
  var url = 'http://foodsafety.ibacorp.us';
  //var url = 'http://www.google.com';
  // within before() you can run all the operations that are needed to setup your tests. 
  // when you are  done, call done().
  before(function(done) {
    // do the pre test setup
    done();
  });
  // use describe to give a title to your test suite, in this case the tile is "FoodREcallTests"
  // and then specify a function in which we are going to declare all the tests
  // we want to run. Each test starts with the function it() and as a first argument 
  // we have to provide a meaningful title for it, whereas as the second argument we
  // specify a function that takes a single parameter, "done", that we will use 
  // to specify when our test is completed, and that's what makes easy
  // to perform async test!
  describe('FoodRecallTests', function() {
       it('should return error if FoodSafety Site is NOT Alive!', function(done) {
      
       // once we have specified the info we want to send to the server via POST verb,
       // we need to actually perform the action on the resource, in this case we want to 
       // GET and we want to send some info
       // We do this using the request object, requiring supertest!
            request(url)
 	      .get('/')
              // end handles the response
	      .end(function(err, res) {
                 if (err) {
                    throw err;
                 }
                 // this is should.js syntax, very clear
                 res.should.have.status(200);
                 done();
              });
       });
       it('should return error if can not fecth the deafult page', function(done){
	var body = { };
        request(url)
           .get('/pages/default.htm')
	   .end(function(err,res) {
	      if (err) {
	         throw err;
	      }
	      done();
               // this is should.js syntax, very clear
               res.should.have.status(200);
	   });
      });
      it('should return error if can not fecth the contact page', function(done){
        var body = { };
        request(url)
           .get('/pages/contact.htm')
           .end(function(err,res) {
              if (err) {
                 throw err;
              }
              done();
               // this is should.js syntax, very clear
               //console.log(res);
               res.should.have.status(200);
           });
      });
      it('should return error if can not fecth the about page', function(done){
        var body = { };
        request(url)
           .get('/pages/about.htm')
           .end(function(err,res) {
              if (err) {
                 throw err;
              }
              done();
               // this is should.js syntax, very clear
               res.should.have.status(200);
           });
      });
      it('should return error if can not select region to check food recalls', function(done){
        var body = { };
        request(url)
           .get('/#/form/Viginia/va')
           .end(function(err,res) {
              if (err) {
                 throw err;
              }
              done();
               // this is should.js syntax, very clear
               //console.log(res);
               res.should.have.status(200);
           });
      });
      it('should return error trying to post and get data from openFDA', function(done) {
      var profile = {
          params:  { 
            product_description: 'Cheese',
            recalling_firm: 'Kraft' },
          distribution_pattern: 'VA',
          status: 'Ongoing' 
      };
    // once we have specified the info we want to send to the server via POST verb,
    // we need to actually perform the action on the resource, in this case we want to 
    // POST on /api/profiles and we want to send some info
    // We do this using the request object, requiring supertest!
    request(url)
        .post('/foodQuery')
        .send(profile)
    // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          //console.log(res.body);
          res.should.have.status(200);
          done();
        });
    });

      it('should return error if can not fecth the recalls page', function(done){
        var body = { };
        request(url)
           .get('/#/recalls/')
           .end(function(err,res) {
              if (err) {
                 throw err;
              }
              done();
               // this is should.js syntax, very clear
               //console.log(res);
               res.should.have.status(200);
           });
      });
      it('should return error if can not fecth the about page', function(done){
        var body = { };
        request(url)
           .get('#/recall/1')
           .end(function(err,res) {
              if (err) {
                 throw err;
              }
              done();
               // this is should.js syntax, very clear
               res.should.have.status(200);
           });
      });

  });
});
