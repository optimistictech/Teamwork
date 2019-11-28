/* eslint-disable radix */
// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import app from '../service';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

let token;
let articleId;
let gifId;
// let userId;

describe('No Authentication', () => {
  describe('Users', () => {
    describe('POST /api/v1/auth', () => {
      it('should login a user', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'superuser@teamwork.com',
            password: 'password123%',
          })
          .end((er, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.data.should.have.property('token');
            res.body.data.should.have.property('userId').eql(1);
            done();
          });
      });
      it('should create an user', (done) => {
        chai.request(app)
          .post('/api/v1/auth/create-user')
          .send({
            firstname: '1Abigail2',
            lastname: '1Akinniyi2',
            email: '1abiniyi21@email.com',
            password: 'password123%',
            gender: 'female',
            jobrole: 'Managing Director',
            address: 'Oyo Road, oyo state',
            staffnumber: 'sn0000001',
            employmentdate: '12-12-2012',
            administrator: false,
          })
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            res.body.should.have.property('error');
            done();
          });
      });
    });
    describe('GET /api/v1/auth', () => {
      it('should get all users', (done) => {
        chai.request(app)
          .get('/api/v1/auth/users')
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            done();
          });
      });
      it('should get one user', (done) => {
        const id = 1;
        chai.request(app)
          .get(`/api/v1/auth/users/${id}`)
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            done();
          });
      });
    });
  });

  describe('Articles', () => {
    describe('GET /api/v1/articles', () => {
      it('should get all articles', (done) => {
        chai.request(app)
          .get('/api/v1/articles')
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            res.body.should.have.property('error');
            // res.body.data[0].should.have.property('feed');
            // res.body.data[0].should.have.property('title');
            // res.body.data[0].should.have.property('inappropflag');
            done();
          });
      });
      it('should get one article', (done) => {
        const id = 5;
        chai.request(app)
          .get(`/api/v1/articles/${id}`)
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            // res.body.should.have.property('data');
            // res.body.data.should.have.property('feed');
            // res.body.data.should.have.property('title');
            // res.body.data[0].should.have.property('inappropflag');
            done();
          });
      });
    });
    describe('PUT /api/v1/articles', () => {
      it('should update an article', (done) => {
        const id = 2;
        chai.request(app)
          .patch(`/api/v1/articles/${id}`)
          .send({
            title: 'changed title',
            feed: 'fourth article is here',
            tagid: 1,
            inappropflag: false,
          })
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            // res.body.data.should.have.property('message').eql('feed successfully updated');
            done();
          });
      });
    });
    describe('POST /api/v1/articles', () => {
      it('should create an article', (done) => {
        chai.request(app)
          .post('/api/v1/articles/')
          .send({
            title: 'a brand new title',
            feed: 'another beautiful article is here',
            createdon: '2019-10-31T23:00:00.000Z',
            authorid: 1,
            tagid: 1,
            inappropflag: false,
          })
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            // res.body.data.should.have.property('message').eql('feed successfully posted');
            done();
          });
      });
    });
    describe('DELETE /api/v1/articles', () => {
      it('should delete an article', (done) => {
        const id = 8;
        chai.request(app)
          .delete(`/api/v1/articles/${id}`)
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            // res.body.should.have.property('data').eql('no rows');
            done();
          });
      });
    });
    describe('POST /api/v1/articles/comments', () => {
      it('should create a comment for an article', (done) => {
        const id = 13;
        chai.request(app)
          .post(`/api/v1/articles/${id}/comment`)
          .send({
            coment: 'this is just wow beautiful article is here',
            inappropflag: false,
            authorid: 2,
          })
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            // res.body.should.have.property('data').eql('created');
            done();
          });
      });
    });
  });

  describe('Gifs', () => {
    describe('GET /api/v1/gifs', () => {
      it('should get all gifs', (done) => {
        chai.request(app)
          .get('/api/v1/gifs')
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            done();
          });
      });
      it('should get one gif', (done) => {
        const id = 1;
        chai.request(app)
          .get(`/api/v1/gifs/${id}`)
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            done();
          });
      });
    });
    describe('PUT /api/v1/gifs', () => {
      it('should update an gif', (done) => {
        const id = 2;
        chai.request(app)
          .patch(`/api/v1/gifs/${id}`)
          .send({
            title: 'new title',
            feed: 'http://cloudinary.com/something.somet.com',
            tagid: 1,
            inappropflag: false,
          })
          .end((er, res) => {
            // res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            done();
          });
      });
    });
    describe('POST /api/v1/gifs', () => {
      it('should create an gif', (done) => {
        chai.request(app)
          .post('/api/v1/gifs/')
          .send({
            title: 'new title',
            feed: 'the link to the page is saved here',
            authorid: 1,
            tagid: 1,
            inappropflag: false,
          })
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            done();
          });
      });
    });
    describe('DELETE /api/v1/gifs', () => {
      it('should delete an gif', (done) => {
        const id = 1;
        chai.request(app)
          .delete(`/api/v1/gifs/${id}`)
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            done();
          });
      });
    });
    describe('POST /api/v1/gifs/comments', () => {
      it('should create a comment for a gif', (done) => {
        const id = 2;
        chai.request(app)
          .post(`/api/v1/gifs/${id}/comment`)
          .send({
            coment: 'this is just wow beautiful gif is here',
            inappropflag: false,
            authorid: 2,
          })
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            // res.body.should.have.property('data').eql('created');
            done();
          });
      });
    });
  });

  describe('Feed', () => {
    describe('GET /feed', () => {
      it('should get latest articles or gifs', (done) => {
        chai.request(app)
          .get('/api/v1/feed')
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            done();
          });
      });
    });
  });

  describe('Tags', () => {
    describe('GET /feed', () => {
      const id = 1;
      it('should get latest articles by tag', (done) => {
        chai.request(app)
          .get(`/api/v1/articles/tag/${id}`)
          .end((er, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status').eql('error');
            done();
          });
      });
    });
  });
});

describe('With Authentication', () => {
  describe('Users', () => {
    describe('POST /api/v1/auth', () => {
      it('should login user', (done) => {
        chai.request(app)
          .post('/api/v1/auth/signin')
          .send({
            email: 'superuser@teamwork.com',
            // email: 'super2user@com.com',
            password: 'password123%',
          })
          .end((er, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.data.should.have.property('token');

            token = res.body.data.token;
            token = `Bearer ${token}`;
            // userId = res.body.data.userId;
            done();
          });
      });
      it('should delete user', (done) => {
        const id = 2;
        chai.request(app)
          .delete(`/api/v1/auth/users/${id}`)
          .set('Authorization', token)
          .end((er, res) => {
            // res.should.have.status(200);
            res.body.should.have.property('status');
            done();
          });
      });
      it('should create an user', (done) => {
        //   console.log(`token is ${token}`);
        chai.request(app)
          .post('/api/v1/auth/create-user')
          .set('Authorization', token)
          .send({
            firstname: 'next',
            lastname: 'user',
            email: 'nextuser@teamwork.com',
            password: 'password123%',
            gender: 'female',
            jobrole: 'Managing Director',
            address: 'Oyo Road, oyo state',
            staffnumber: '38273',
            employmentdate: '12-12-2012',
            administrator: false,
          })
          .end((er, res) => {
            res.should.have.status(201);
            res.body.should.have.property('status').eql('success');
            done();
          });
      });
    });
    describe('GET /api/v1/auth', () => {
      it('should get all users', (done) => {
        chai.request(app)
          .get('/api/v1/auth/users')
          .set('Authorization', token)
          .end((er, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            done();
          });
      });
      it('should get one user', (done) => {
        const id = 1;
        chai.request(app)
          .get(`/api/v1/auth/users/${id}`)
          .set('Authorization', token)
          .end((er, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            done();
          });
      });
    });
  });

  describe('Articles', () => {
    describe('POST /api/v1/articles', () => {
      it('should create an article', (done) => {
        chai.request(app)
          .post('/api/v1/articles/')
          .set('Authorization', token)
          .send({
            title: 'a brand new title',
            feed: 'another beautiful article is here',
            createdon: '2019-10-31T23:00:00.000Z',
            authorid: 1,
            tagid: 1,
            inappropflag: false,
          })
          .end((er, res) => {
            res.should.have.status(201);
            res.body.should.have.property('status').eql('success');
            articleId = res.body.data.feedid;
            // res.body.data.should.have.property('message').eql('feed successfully posted');
            done();
          });
      });
    });
    describe('POST /api/v1/articles/comments', () => {
      it('should create a comment for an article', (done) => {
        const id = parseInt(articleId);
        chai.request(app)
          .post(`/api/v1/articles/${id}/comment`)
          .set('Authorization', token)
          .send({
            coment: 'this is just wow beautiful article is here',
            inappropflag: false,
            authorid: 1,
          })
          .end((er, res) => {
            res.should.have.status(201);
            res.body.should.have.property('status').eql('success');
            // res.body.should.have.property('data').eql('created');
            done();
          });
      });
    });
    describe('GET /api/v1/articles', () => {
      it('should get all articles', (done) => {
        chai.request(app)
          .get('/api/v1/articles')
          .set('Authorization', token)
          .end((er, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            // res.body.should.have.property('error');
            // res.body.data[0].should.have.property('feed');
            // res.body.data[0].should.have.property('title');
            // res.body.data[0].should.have.property('inappropflag');
            done();
          });
      });
      it('should get one article', (done) => {
        const id = parseInt(articleId);
        chai.request(app)
          .get(`/api/v1/articles/${id}`)
          .set('Authorization', token)
          .end((er, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            // res.body.should.have.property('data');
            // res.body.data.should.have.property('feed');
            // res.body.data.should.have.property('title');
            // res.body.data[0].should.have.property('inappropflag');
            done();
          });
      });
    });
    describe('PUT /api/v1/articles', () => {
      it('should update an article', (done) => {
        const id = parseInt(articleId);
        chai.request(app)
          .patch(`/api/v1/articles/${id}`)
          .set('Authorization', token)
          .send({
            title: 'changed title',
            feed: 'fourth article is here',
            tagid: 1,
            inappropflag: false,
          })
          .end((er, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            // res.body.data.should.have.property('message').eql('feed successfully updated');
            done();
          });
      });
    });
    describe('DELETE /api/v1/articles', () => {
      it('should delete an article', (done) => {
        const id = parseInt(articleId);
        chai.request(app)
          .delete(`/api/v1/articles/${id}`)
          .set('Authorization', token)
          .end((er, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            // res.body.should.have.property('data').eql('no rows');
            done();
          });
      });
    });
  });

  describe('Gifs', () => {
    describe('POST /api/v1/gifs', () => {
      it('should create an gif', (done) => {
        //   done();
        chai.request(app)
          .post('/api/v1/gifs/')
          .set('Authorization', token)
          .set('Content-Type', 'application/x-www-form-urlencoded')
        //   .send({
        //     title: 'new title',
        //     feed: 'the link to the page is saved here',
        //     authorid: 1,
        //     tagid: 1,
        //     inappropflag: false,
        //   })
          .field('title', 'New Title Now Gif')
          .field('authorid', 1)
          .field('tagid', 1)
          .field('inappropflag', false)
          .attach('file', fs.readFileSync('files/images/Capture.PNG'), 'Capture.PNG')
          .end((er, res) => {
            console.log('here');
            res.should.have.status(201);
            res.body.should.have.property('status').eql('success');
            gifId = res.body.data.feedid;
            done();
          });
      });
    });
    describe('POST /api/v1/gifs/comments', () => {
      it('should create a comment for a gif', (done) => {
        const id = parseInt(gifId);
        chai.request(app)
          .post(`/api/v1/gifs/${id}/comment`)
          .set('Authorization', token)
          .send({
            coment: 'this is just wow beautiful gif is here',
            inappropflag: false,
            authorid: 1,
          })
          .end((er, res) => {
            res.should.have.status(201);
            res.body.should.have.property('status').eql('success');
            // res.body.should.have.property('data').eql('created');
            done();
          });
      });
    });
    describe('GET /api/v1/gifs', () => {
      it('should get all gifs', (done) => {
        chai.request(app)
          .get('/api/v1/gifs')
          .set('Authorization', token)
          .end((er, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            done();
          });
      });
      it('should get one gif', (done) => {
        const id = parseInt(gifId);
        chai.request(app)
          .get(`/api/v1/gifs/${id}`)
          .set('Authorization', token)
          .end((er, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            done();
          });
      });
    });
    // describe('PUT /api/v1/gifs', () => {
    //   it('should update an gif', async (done) => {
    //     const id = 96;
    //     done();
    //     chai.request(app)
    //       .patch(`/api/v1/gifs/${id}`)
    //       .set('Authorization', token)
    //       .set('Content-Type', 'application/x-www-form-urlencoded')
    //     //   .send({
    //     //     title: 'new title',
    //     //     feed: 'http://cloudinary.com/something.somet.com',
    //     //     tagid: 1,
    //     //     inappropflag: false,
    //     //   })
    //       .field('title', 'New Title Now Gif')
    //     //   .field('authorid', 1)
    //       .field('tagid', 1)
    //       .field('inappropflag', false)
    //       .attach('file', fs.readFileSync('files/images/Capture.PNG'), 'Capture.PNG')
    //       .end((er, res) => {
    //         // res.should.have.status(401);
    //         console.log(res.body.error.message)
    //         res.body.should.have.property('status').eql('success');
    //         done();
    //       });
    //   });
    // });
    describe('DELETE /api/v1/gifs', () => {
      it('should delete an gif', (done) => {
        const id = parseInt(gifId);
        chai.request(app)
          .delete(`/api/v1/gifs/${id}`)
          .set('Authorization', token)
          .end((er, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            done();
          });
      });
    });
  });

  describe('POST Article Again /api/v1/articles', () => {
    it('should create an article', (done) => {
      chai.request(app)
        .post('/api/v1/articles/')
        .set('Authorization', token)
        .send({
          title: 'a brand new title',
          feed: 'another beautiful article is here',
          createdon: '2019-10-31T23:00:00.000Z',
          authorid: 1,
          tagid: 1,
          inappropflag: false,
        })
        .end((er, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').eql('success');
          // res.body.data.should.have.property('message').eql('feed successfully posted');
          done();
        });
    });
  });

  describe('Feed', () => {
    describe('GET /feed', () => {
      it('should get latest articles or gifs', (done) => {
        chai.request(app)
          .get('/api/v1/feed')
          .set('Authorization', token)
          .end((er, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            done();
          });
      });
    });
  });

  describe('Tags', () => {
    describe('GET /feed', () => {
      const id = 1;
      it('should get latest articles by tag', (done) => {
        chai.request(app)
          .get(`/api/v1/articles/tag/${id}`)
          .set('Authorization', token)
          .end((er, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            done();
          });
      });
    });
  });
});
