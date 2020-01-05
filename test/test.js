/**
 * test/test.js
 * Basic tests for Auth system API
 */
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
chai.use(http);

const user = require('../app/models/usersProfile.model');

//start app
const app = require('../server');
describe('users', () => {

  describe('App', () => {
    it('Should exists', () => {
      expect(app).to.be.a('function');
    })

    it('GET / should return 200 and message', (done) => {
      chai.request(app).get('/')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.contain('Welcome to Moodcafe application');
          done();
        }).catch(err => {
          console.log(err.message);
        })
    });
  })


  beforeEach((done) => { //Before each test we empty the database
    user.remove({}, (err) => {
      done();
    });
  });

  describe('User registration', () => {

    it('Should return 200 and confirmation for valid input', (done) => {
      //mock valid user input
      const new_user = {
        "name": "john Wick",
        "email": "john@wick.com",
        "password": "secret",
        "isAdmin": true
      }
      //send request to the app
      chai.request(app).post('/user/register')
        .send(new_user)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.be.equal("success");
          done();
        }).catch(err => {
          console.log('hello', err.message);
        })
    });
  })
});

// Token is stored in auth for future reference
var auth = {}

describe('User login', () => {
  it('should return 200 and token for valid credentials', (done) => {
    //mock user input
    const valid_input = {
      "email": "john@wick.com",
      "password": "secret"
    }
    //send request to the app
    chai.request(app).post('/user/login')
      .send(valid_input)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.exist;
        expect(res.body.message).to.be.equal("Auth OK");
        auth.token = res.body.token;
        done();
      }).catch(err => {
        console.log(err.message);
      })
  });
});

describe('Add Book in bookStore', () => {
  it('should return 200 and add book in bookStore', (done) => {
    //mock book input
    const book = {
      "title": "The Lord of the Rings",
      "description": " One Ring to rule the other Rings of Power",
      "price": 500,
      "author": "J. R. R. Tolkien",
      "year": 1954

    }
    //send request to the app
    chai.request(app).post('/bookStore/addBook')
      .send(book)
      .set({ "x-access-token": auth.token })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.book).to.exist;
        expect(res.body.message).to.be.equal("Book successfully added");
        done();
      }).catch(err => {
        console.log(err.message);
      })
  });
});

describe('List Book in bookStore', () => {
  it('should return 200 and If list foound in bookStore', (done) => {
    //send request to the app
    chai.request(app).get('/bookStore/listBooks')
      .set({ "x-access-token": auth.token })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.books).to.exist;
        expect(res.body.message).to.be.equal("success");
        done();
      }).catch(err => {
        console.log(err.message);
      })
  });
});

describe('purchase Book from bookStore by book title', () => {
  it('should return 200 and add purchase history in purchase collections', (done) => {
    //mock valid book input
    const purchase = {
      "bookTitle": "The Lord of the Rings"
    }
    //send request to the app
    chai.request(app).post('/purchase/byBookTitle')
      .send(purchase)
      .set({ "x-access-token": auth.token })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.result).to.exist;
        expect(res.body.message).to.be.equal("success");
        done();
      }).catch(err => {
        console.log(err.message);
      })
  });
});