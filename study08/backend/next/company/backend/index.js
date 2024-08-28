const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3500;

const membersRoutes = require('./controllers/MembersController');
const boardsRoutes = require('./controllers/BoardsController');
const qnaRoutes = require('./controllers/QnaController');
const dataroomRoutes = require('./controllers/DataroomController');
const productRoutes = require('./controllers/ProductController');
const homeRoutes = require('./controllers/HomeController');

app.use(bodyParser.json());

// 라우트 설정
app.use('/api/members', membersRoutes);
app.use('/api/boards', boardsRoutes);
app.use('/api/qna', qnaRoutes);
app.use('/api/dataroom', dataroomRoutes);
app.use('/api/product', productRoutes);
app.use('/api', homeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});