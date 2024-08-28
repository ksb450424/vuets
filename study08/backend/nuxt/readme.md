1. Nuxt.js 프로젝트 생성과 프로젝트 구조

먼저 Nuxt.js 프로젝트를 생성합니다.

```sh
npx create-nuxt-app company
cd company
```

```lua
company/
├── assets/
├── components/
├── layouts/
├── middleware/
├── pages/
├── plugins/
├── static/
├── store/
├── config/
│   └── config.js
├── controllers/
│   ├── boardController.js
│   ├── dataroomController.js
│   ├── emailController.js
│   ├── memberController.js
│   ├── productController.js
│   └── qnaController.js
├── migrations/
├── models/
│   ├── board.js
│   ├── dataroom.js
│   ├── index.js
│   ├── member.js
│   ├── product.js
│   └── qna.js
├── services/
│   ├── boardService.js
│   ├── dataroomService.js
│   ├── emailService.js
│   ├── memberService.js
│   ├── productService.js
│   └── qnaService.js
├── uploads/
├── .sequelizerc
├── nuxt.config.js
├── package.json
├── server.js
└── yarn.lock
```



2. 필요한 패키지 설치

Nuxt.js 프로젝트 디렉토리에서 다음 명령어를 실행하여 필요한 패키지들을 설치합니다.

```sh
npm install express sequelize sequelize-cli mysql2 bcrypt jsonwebtoken multer nodemailer body-parser
```

3. Sequelize 설정
프로젝트 루트에 .sequelizerc 파일을 생성하고 아래와 같이 설정합니다.

```js
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.js'),
  'models-path': path.resolve('models'),
  'seeders-path': path.resolve('seeders'),
  'migrations-path': path.resolve('migrations')
};
```


4. Sequelize 초기화

```sh
npx sequelize-cli init
```

5. 데이터베이스 설정

config/config.js 파일을 열고 MariaDB 연결 정보를 추가합니다.

```js
module.exports = {
  development: {
    username: 'root',
    password: '1234',
    database: 'company',
    host: '127.0.0.1',
    port: 3307,
    dialect: 'mysql'
  }
};
```


6. 데이터베이스 모델 생성

각 모델 파일을 models 디렉토리에 생성합니다. 

models/member.js, models/board.js, models/qna.js, models/dataroom.js, models/product.js)

models/member.js

```js
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    id: { type: DataTypes.STRING, primaryKey: true },
    pw: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    birth: { type: DataTypes.DATE, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    tel: { type: DataTypes.STRING, allowNull: true },
    addr1: { type: DataTypes.STRING, allowNull: true },
    addr2: { type: DataTypes.STRING, allowNull: true },
    postcode: { type: DataTypes.STRING, allowNull: true },
    regdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'member',
    timestamps: false
  });
  return Member;
};
```

models/board.js

```js
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    no: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    resdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    hits: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    tableName: 'board',
    timestamps: false
  });
  return Board;
};
```

models/qna.js 

```js
module.exports = (sequelize, DataTypes) => {
  const Qna = sequelize.define('Qna', {
    qno: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    lev: { type: DataTypes.INTEGER, defaultValue: 0 },
    parno: { type: DataTypes.INTEGER, allowNull: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    resdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    hits: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    tableName: 'qna',
    timestamps: false
  });
  return Qna;
};
```

models/dataroom.js

```js
module.exports = (sequelize, DataTypes) => {
  const Dataroom = sequelize.define('Dataroom', {
    dno: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    datafile: { type: DataTypes.STRING, allowNull: true },
    resdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    hits: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    tableName: 'dataroom',
    timestamps: false
  });
  return Dataroom;
};
```

models/product.js 

```js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    pno: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cate: { type: DataTypes.STRING, allowNull: false },
    pname: { type: DataTypes.STRING, allowNull: false },
    pcontent: { type: DataTypes.TEXT, allowNull: false },
    img1: { type: DataTypes.STRING, allowNull: true },
    img2: { type: DataTypes.STRING, allowNull: true },
    img3: { type: DataTypes.STRING, allowNull: true },
    resdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    hits: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    tableName: 'product',
    timestamps: false
  });
  return Product;
};
```



7. 마이그레이션 생성 및 실행

마이그레이션 파일을 생성하고 실행합니다.

```sh
npx sequelize-cli db:migrate
```


8. 서버 설정

server.js 파일을 프로젝트 루트에 생성하고 아래 내용을 추가합니다.

```js
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
```


9. 컨트롤러 파일 생성

각 기능별로 컨트롤러 파일을 controllers 디렉토리에 생성합니다.

controllers/memberController.js

```js
const MemberService = require('../services/memberService');
const jwt = require('jsonwebtoken');

class MemberController {
  async getMemberList(req, res) {
    const members = await MemberService.getAllMembers();
    res.json(members);
  }

  async getMember(req, res) {
    const member = await MemberService.getMemberById(req.params.id);
    res.json(member);
  }

  async mypage(req, res) {
    const member = await MemberService.getMemberById(req.params.id);
    res.json(member);
  }

  async join(req, res) {
    const newMember = await MemberService.createMember(req.body);
    res.json(newMember);
  }

  async myInfoEdit(req, res) {
    await MemberService.updateMember(req.params.id, req.body);
    res.json({ success: true });
  }

  async login(req, res) {
    try {
      const member = await MemberService.authenticate(req.body.id, req.body.pw);
      const token = jwt.sign({ id: member.id }, 'your-secret-key', { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async logout(req, res) {
    res.json({ success: true });
  }
}

module.exports = new MemberController();
```

controllers/boardController.js

```js
const BoardService = require('../services/boardService');

class BoardController {
  async list(req, res) {
    const boards = await BoardService.getAllBoards();
    res.json(boards);
  }

  async detail(req, res) {
    const board = await BoardService.getBoardById(req.params.no);
    res.json(board);
  }

  async insert(req, res) {
    const newBoard = await BoardService.createBoard(req.body);
    res.json(newBoard);
  }

  async update(req, res) {
    await BoardService.updateBoard(req.params.no, req.body);
    res.json({ success: true });
  }

  async delete(req, res) {
    await BoardService.deleteBoard(req.params.no);
    res.json({ success: true });
  }
}

module.exports = new BoardController();
```

controllers/qnaController.js

```js
const QnaService = require('../services/qnaService');

class QnaController {
  async list(req, res) {
    const qnas = await QnaService.getAllQnas();
    res.json(qnas);
  }

  async detail(req, res) {
    const qna = await QnaService.getQnaById(req.params.qno);
    res.json(qna);
  }

  async insert(req, res) {
    const newQna = await QnaService.createQna(req.body);
    res.json(newQna);
  }

  async edit(req, res) {
    await QnaService.updateQna(req.params.qno, req.body);
    res.json({ success: true });
  }

  async delete(req, res) {
    await QnaService.deleteQna(req.params.qno);
    res.json({ success: true });
  }

  async answer(req, res) {
    const newAnswer = await QnaService.answerQna(req.body.parno, req.body);
    res.json(newAnswer);
  }
}

module.exports = new QnaController();
```


controllers/dataroomController.js

```js
const DataroomService = require('../services/dataroomService');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

class DataroomController {
  async list(req, res) {
    const datarooms = await DataroomService.getAllDatarooms();
    res.json(datarooms);
  }

  async detail(req, res) {
    const dataroom = await DataroomService.getDataroomById(req.params.dno);
    res.json(dataroom);
  }

  async upload(req, res) {
    upload.single('datafile')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const newDataroom = {
        ...req.body,
        datafile: req.file ? req.file.filename : null
      };
      const createdDataroom = await DataroomService.createDataroom(newDataroom);
      res.json(createdDataroom);
    });
  }

  async update(req, res) {
    upload.single('datafile')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const updatedDataroom = {
        ...req.body,
        datafile: req.file ? req.file.filename : req.body.datafile
      };
      await DataroomService.updateDataroom(req.params.dno, updatedDataroom, req.file ? req.file.filename : null);
      res.json({ success: true });
    });
  }

  async delete(req, res) {
    await DataroomService.deleteDataroom(req.params.dno);
    res.json({ success: true });
  }
}

module.exports = new DataroomController();
```


controllers/productController.js

```js
const ProductService = require('../services/productService');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

class ProductController {
  async list(req, res) {
    const products = await ProductService.getAllProducts();
    res.json(products);
  }

  async detail(req, res) {
    const product = await ProductService.getProductById(req.params.pno);
    res.json(product);
  }

  async insert(req, res) {
    upload.fields([{ name: 'img1' }, { name: 'img2' }, { name: 'img3' }])(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const newProduct = {
        ...req.body,
        img1: req.files['img1'] ? req.files['img1'][0].filename : null,
        img2: req.files['img2'] ? req.files['img2'][0].filename : null,
        img3: req.files['img3'] ? req.files['img3'][0].filename : null,
      };
      const createdProduct = await ProductService.createProduct(newProduct);
      res.json(createdProduct);
    });
  }

  async update(req, res) {
    upload.fields([{ name: 'img1' }, { name: 'img2' }, { name: 'img3' }])(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const updatedProduct = {
        ...req.body,
        img1: req.files['img1'] ? req.files['img1'][0].filename : req.body.img1,
        img2: req.files['img2'] ? req.files['img2'][0].filename : req.body.img2,
        img3: req.files['img3'] ? req.files['img3'][0].filename : req.body.img3,
      };
      await ProductService.updateProduct(req.params.pno, updatedProduct, req.files);
      res.json({ success: true });
    });
  }

  async delete(req, res) {
    await ProductService.deleteProduct(req.params.pno);
    res.json({ success: true });
  }
}

module.exports = new ProductController();
```

controllers/emailController.js

```js
const EmailService = require('../services/emailService');

class EmailController {
  async send(req, res) {
    try {
      await EmailService.sendEmail(req.body);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EmailController();
```

10. 서비스 파일 생성

각 기능별로 서비스 파일을 services 디렉토리에 생성합니다.

services/memberService.js

```js
const { Member } = require('../models');
const bcrypt = require('bcrypt');

class MemberService {
  async getAllMembers() {
    return await Member.findAll();
  }

  async getMemberById(id) {
    return await Member.findOne({ where: { id } });
  }

  async createMember(memberData) {
    const hashedPassword = await bcrypt.hash(memberData.pw, 10);
    memberData.pw = hashedPassword;
    return await Member.create(memberData);
  }

  async updateMember(id, memberData) {
    if (memberData.pw) {
      const hashedPassword = await bcrypt.hash(memberData.pw, 10);
      memberData.pw = hashedPassword;
    }
    return await Member.update(memberData, { where: { id } });
  }

  async deleteMember(id) {
    return await Member.destroy({ where: { id } });
  }

  async authenticate(id, pw) {
    const member = await Member.findOne({ where: { id } });
    if (!member) throw new Error('Member not found');
    const isPasswordValid = await bcrypt.compare(pw, member.pw);
    if (!isPasswordValid) throw new Error('Invalid password');
    return member;
  }
}

module.exports = new MemberService();
```

services/boardService.js

```js
const { Board } = require('../models');

class BoardService {
  async getAllBoards() {
    return await Board.findAll();
  }

  async getBoardById(no) {
    return await Board.findOne({ where: { no } });
  }

  async createBoard(boardData) {
    return await Board.create(boardData);
  }

  async updateBoard(no, boardData) {
    return await Board.update(boardData, { where: { no } });
  }

  async deleteBoard(no) {
    return await Board.destroy({ where: { no } });
  }
}

module.exports = new BoardService();
```

services/qnaService.js 

```js
const { Qna } = require('../models');

class QnaService {
  async getAllQnas() {
    return await Qna.findAll();
  }

  async getQnaById(qno) {
    return await Qna.findOne({ where: { qno } });
  }

  async createQna(qnaData) {
    return await Qna.create(qnaData);
  }

  async updateQna(qno, qnaData) {
    return await Qna.update(qnaData, { where: { qno } });
  }

  async deleteQna(qno) {
    return await Qna.destroy({ where: { qno } });
  }

  async answerQna(parentQno, answerData) {
    const parentQna = await Qna.findOne({ where: { qno: parentQno } });
    if (!parentQna) throw new Error('Parent Qna not found');
    answerData.parno = parentQno;
    answerData.lev = parentQna.lev + 1;
    return await Qna.create(answerData);
  }
}

module.exports = new QnaService();
```

services/dataroomService.js

```js
const { Dataroom } = require('../models');
const fs = require('fs');
const path = require('path');

class DataroomService {
  async getAllDatarooms() {
    return await Dataroom.findAll();
  }

  async getDataroomById(dno) {
    return await Dataroom.findOne({ where: { dno } });
  }

  async createDataroom(dataroomData) {
    return await Dataroom.create(dataroomData);
  }

  async updateDataroom(dno, dataroomData, filePath) {
    const dataroom = await Dataroom.findOne({ where: { dno } });
    if (!dataroom) throw new Error('Dataroom not found');
    if (filePath && dataroom.datafile) {
      fs.unlinkSync(path.join(__dirname, '..', 'uploads', dataroom.datafile));
    }
    return await Dataroom.update(dataroomData, { where: { dno } });
  }

  async deleteDataroom(dno) {
    const dataroom = await Dataroom.findOne({ where: { dno } });
    if (!dataroom) throw new Error('Dataroom not found');
    if (dataroom.datafile) {
      fs.unlinkSync(path.join(__dirname, '..', 'uploads', dataroom.datafile));
    }
    return await Dataroom.destroy({ where: { dno } });
  }
}

module.exports = new DataroomService();
```

services/productService.js

```js
const { Product } = require('../models');
const fs = require('fs');
const path = require('path');

class ProductService {
  async getAllProducts() {
    return await Product.findAll();
  }

  async getProductById(pno) {
    return await Product.findOne({ where: { pno } });
  }

  async createProduct(productData) {
    return await Product.create(productData);
  }

  async updateProduct(pno, productData, newImages) {
    const product = await Product.findOne({ where: { pno } });
    if (!product) throw new Error('Product not found');

    // Delete old images if new images are provided
    for (let i = 1; i <= 3; i++) {
      const imgKey = `img${i}`;
      if (newImages[imgKey] && product[imgKey]) {
        fs.unlinkSync(path.join(__dirname, '..', 'uploads', product[imgKey]));
      }
    }

    return await Product.update(productData, { where: { pno } });
  }

  async deleteProduct(pno) {
    const product = await Product.findOne({ where: { pno } });
    if (!product) throw new Error('Product not found');

    // Delete images
    for (let i = 1; i <= 3; i++) {
      const imgKey = `img${i}`;
      if (product[imgKey]) {
        fs.unlinkSync(path.join(__dirname, '..', 'uploads', product[imgKey]));
      }
    }

    return await Product.destroy({ where: { pno } });
  }
}

module.exports = new ProductService();
```


11. 실행 명령어

```sh
# 개발 모드에서 애플리케이션 실행
npm run dev

# 또는 프로덕션 모드에서 실행
npm run build
npm start
```

