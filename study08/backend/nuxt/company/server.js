const express = require('express');
const { Nuxt, Builder } = require('nuxt');
const config = require('./nuxt.config.js');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const boardController = require('./controllers/boardController');
const qnaController = require('./controllers/qnaController');
const dataroomController = require('./controllers/dataroomController');
const productController = require('./controllers/productController');
const memberController = require('./controllers/memberController');
const emailController = require('./controllers/emailController');

app.use('/uploads', express.static('uploads'));

app.get('/company/boards/list', boardController.list);
app.get('/company/boards/detail/:no', boardController.detail);
app.post('/company/boards/insert', boardController.insert);
app.post('/company/boards/update/:no', boardController.update);
app.post('/company/boards/delete/:no', boardController.delete);

app.get('/company/qna/list', qnaController.list);
app.get('/company/qna/detail/:qno', qnaController.detail);
app.post('/company/qna/insert', qnaController.insert);
app.post('/company/qna/answer', qnaController.answer);
app.post('/company/qna/edit/:qno', qnaController.edit);
app.post('/company/qna/delete/:qno', qnaController.delete);

app.get('/company/dataroom/list', dataroomController.list);
app.get('/company/dataroom/detail/:dno', dataroomController.detail);
app.post('/company/dataroom/upload', dataroomController.upload);
app.post('/company/dataroom/update/:dno', dataroomController.update);
app.post('/company/dataroom/delete/:dno', dataroomController.delete);

app.get('/company/products/list', productController.list);
app.get('/company/products/detail/:pno', productController.detail);
app.post('/company/products/insert', productController.insert);
app.post('/company/products/update/:pno', productController.update);
app.post('/company/products/delete/:pno', productController.delete);

app.get('/company/members/getMemberList', memberController.getMemberList);
app.get('/company/members/getMember/:id', memberController.getMember);
app.get('/company/members/mypage/:id', memberController.mypage);
app.post('/company/members/join', memberController.join);
app.post('/company/members/myInfoEdit/:id', memberController.myInfoEdit);
app.post('/company/members/login', memberController.login);
app.post('/company/members/logout', memberController.logout);

app.post('/company/email/send', emailController.send);

config.dev = !(process.env.NODE_ENV === 'production');
const nuxt = new Nuxt(config);

if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}

app.use(nuxt.render);

app.listen(8088, '0.0.0.0');
console.log('Server is running on http://localhost:8088');