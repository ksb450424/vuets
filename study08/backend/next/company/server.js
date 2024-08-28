const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const next = require('next');
const sequelize = require('./config/database');

const boardController = require('./controllers/BoardsController');
const qnaController = require('./controllers/QnaController');
const dataroomController = require('./controllers/DataroomController');
const productController = require('./controllers/ProductController');
const memberController = require('./controllers/MembersController');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Board routes
app.get('/company/boards/list', boardController.list);
app.get('/company/boards/detail/:id', boardController.detail);
app.post('/company/boards/insert', boardController.insert);
app.put('/company/boards/update/:id', boardController.update); // Change to `put` for update operations
app.delete('/company/boards/delete/:id', boardController.delete); // Change to `delete` for delete operations

// Qna routes
app.get('/company/qna/list', qnaController.list);
app.get('/company/qna/detail/:id', qnaController.detail);
app.post('/company/qna/insert', qnaController.insert);
app.post('/company/qna/answer/:id', qnaController.answer);
app.put('/company/qna/edit/:id', qnaController.edit); // Change to `put` for update operations
app.delete('/company/qna/delete/:id', qnaController.delete); // Change to `delete` for delete operations

// Dataroom routes
app.get('/company/dataroom/list', dataroomController.list);
app.get('/company/dataroom/detail/:id', dataroomController.detail);
app.post('/company/dataroom/upload', dataroomController.upload);
app.put('/company/dataroom/update/:id', dataroomController.update); // Change to `put` for update operations
app.delete('/company/dataroom/delete/:id', dataroomController.delete); // Change to `delete` for delete operations

// Product routes
app.get('/company/products/list', productController.list);
app.get('/company/products/detail/:id', productController.detail);
app.post('/company/products/insert', productController.insert);
app.put('/company/products/update/:id', productController.update); // Change to `put` for update operations
app.delete('/company/products/delete/:id', productController.delete); // Change to `delete` for delete operations

// Member routes
app.get('/company/members/getMemberList', memberController.list);
app.get('/company/members/getMember/:id', memberController.detail);
app.post('/company/members/join', memberController.insert);
app.put('/company/members/myInfoEdit/:id', memberController.update); // Change to `put` for update operations
app.delete('/company/members/delete/:id', memberController.delete); // Change to `delete` for delete operations

const PORT = 3500;

nextApp.prepare().then(() => {
  sequelize.sync()
    .then(() => {
      // Next.js 핸들러
      app.all('*', (req, res) => {
        return handle(req, res);
      });

      app.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch(err => console.log(err));
});
