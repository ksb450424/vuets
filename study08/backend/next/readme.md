# 1. Next.js 개발 환경 구축

## 1-1. 개발 환경 준비

1. Node.js (최소 버전 12.x)
2. npm 또는 Yarn 패키지 관리자
3. MariaDB 서버 

<br><br><br>

## 1-2. 개발 환경 단계별 가이드

### 1단계: Node.js와 npm 설치

- Node.js와 npm이 아직 설치되지 않았다면, 공식 Node.js 웹사이트에서 다운로드하고 설치하세요.

<br><br>

### 2단계: MariaDB 설치

- MariaDB는 공식 MariaDB 웹사이트에서 다운로드하여 설치하세요.

<br><br>

### 3단계: Next.js 애플리케이션 생성

- 터미널을 열고 다음 명령어를 실행하여 company라는 새로운 Next.js 애플리케이션을 생성합니다.

```bash
npm -g install next react react-dom
npx create-next-app company
```

<br>

- 프로젝트 디렉토리로 이동합니다:

```bash
cd company
npm uninstall eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm uninstall typescript
```
<br><br>

### 4단계: 필요한 종속성 설치

- 프로젝트에 필요한 express, sequelize, mysql2, cors 등의 종속성을 설치합니다.

```bash
npm install express sequelize mysql2 cors body-parser nodemailer
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install @tailwindcss/forms
npm install @tailwindcss/typography
npm install @tailwindcss/aspect-ratio
npm install mariadb
```

<br>

Yarn을 선호한다면 다음 명령어를 사용하세요:

```bash
yarn add express sequelize mysql2 cors body-parser nodemailer
yarn add tailwindcss postcss autoprefixer
yarn tailwindcss init -p
yarn add @tailwindcss/forms
yarn add @tailwindcss/typography
yarn add @tailwindcss/aspect-ratio
yarn add mariadb
```

<br><br>

### 5단계: Sequelize 설정

- 프로젝트의 디렉토리 구조를 생성합니다:

```bash
md backend
cd backend
md controllers
md models
md services
md config
cd ..
```

<br>

- Sequelize 설정 파일을 company/backend/config/database.js에 생성합니다:

```js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('company', 'root', '1234', {
    host: 'localhost',
    dialect: 'mariadb',
    port: 3307,
});

module.exports = sequelize;
```

<br><br>

### 6단계: 모델 생성

- company/backend/models 디렉토리에 Board, Qna, Dataroom, Product, Member 모델 파일을 생성합니다.

```js
// company/backend/models/board.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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

module.exports = Board;
```

<br><br>

### 7단계: 서비스 생성

- company/backend/services 디렉토리에 Board, Qna, Dataroom, Product, Member 서비스 파일을 생성합니다.

```js
// company/backend/services/boardService.js
const Board = require('../models/board');

async function getAllBoards() {
    return await Board.findAll();
}

async function getBoardById(id) {
    return await Board.findByPk(id);
}

async function createBoard(data) {
    return await Board.create(data);
}

async function updateBoard(id, data) {
    return await Board.update(data, { where: { no: id } });
}

async function deleteBoard(id) {
    return await Board.destroy({ where: { no: id } });
}

module.exports = { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard };
```


<br><br>

### 8단계: 컨트롤러 생성

- company/backend/controllers 디렉토리에 Board, Qna, Dataroom, Product, Member 컨트롤러 파일을 생성합니다.

```js
// company/backend/controllers/boardController.js
const boardService = require('../services/boardService');

async function getBoards(req, res) {
    const boards = await boardService.getAllBoards();
    res.json(boards);
}

async function getBoard(req, res) {
    const board = await boardService.getBoardById(req.params.id);
    res.json(board);
}

async function createBoard(req, res) {
    const board = await boardService.createBoard(req.body);
    res.json(board);
}

async function updateBoard(req, res) {
    const board = await boardService.updateBoard(req.params.id, req.body);
    res.json(board);
}

async function deleteBoard(req, res) {
    await boardService.deleteBoard(req.params.id);
    res.sendStatus(204);
}

module.exports = { getBoards, getBoard, createBoard, updateBoard, deleteBoard };
```

<br><br>

### 9단계: Express 서버 생성

Express 서버를 설정하는 index.js 파일을 backend 디렉토리에 생성합니다:

```js
// company/backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');

const boardController = require('./controllers/boardController');
const qnaController = require('./controllers/qnaController');
const dataroomController = require('./controllers/dataroomController');
const productController = require('./controllers/productController');
const memberController = require('./controllers/memberController');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/company/backend/boards/list', boardController.getBoards);
app.get('/company/backend/boards/detail/:id', boardController.getBoard);
app.post('/company/backend/boards/insert', boardController.createBoard);
app.post('/company/backend/boards/update/:id', boardController.updateBoard);
app.post('/company/backend/boards/delete/:id', boardController.deleteBoard);

app.get('/company/backend/qna/list', qnaController.getQnas);
app.get('/company/backend/qna/detail/:id', qnaController.getQna);
app.post('/company/backend/qna/insert', qnaController.createQna);
app.post('/company/backend/qna/answer/:id', qnaController.answerQna);
app.post('/company/backend/qna/edit/:id', qnaController.editQna);
app.post('/company/backend/qna/delete/:id', qnaController.deleteQna);

app.get('/company/backend/dataroom/list', dataroomController.getDatarooms);
app.get('/company/backend/dataroom/detail/:id', dataroomController.getDataroom);
app.post('/company/backend/dataroom/upload', dataroomController.uploadDataroom);
app.post('/company/backend/dataroom/update/:id', dataroomController.updateDataroom);
app.post('/company/backend/dataroom/delete/:id', dataroomController.deleteDataroom);

app.get('/company/backend/products/list', productController.getProducts);
app.get('/company/backend/products/detail/:id', productController.getProduct);
app.post('/company/backend/products/insert', productController.createProduct);
app.post('/company/backend/products/update/:id', productController.updateProduct);
app.post('/company/backend/products/delete/:id', productController.deleteProduct);

app.get('/company/backend/members/getMemberList', memberController.getMembers);
app.get('/company/backend/members/getMember/:id', memberController.getMember);
app.post('/company/backend/members/join', memberController.createMember);
app.post('/company/backend/members/myInfoEdit/:id', memberController.updateMember);
app.post('/company/backend/members/delete/:id', memberController.deleteMember);

const PORT = 3500;

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.log(err));
```

<br><br>

### 10단계: Next.js와 Express 연결

- Next.js 프로젝트의 루트 디렉토리에 있는 next.config.js 파일을 수정하여 커스텀 서버를 추가합니다:

```js
// next.config.js
module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `http://localhost:3500/:path*` // 백엔드로 프록시
            }
        ]
    }
}
```

<br><br>

### 11단계: 개발 서버 시작

- Express 서버를 시작합니다:

```bash
node company/backend/index.js
```

<br>

- Next.js 서버를 시작합니다:

```bash
npm run dev
```

<br><br><br>

## 1-3. MariaDB 테이블 생성

```sql
USE company;

CREATE TABLE board (
    no INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    resdate DATETIME DEFAULT CURRENT_TIMESTAMP,
    hits INT DEFAULT 0
);

CREATE TABLE member (
    id VARCHAR(50) PRIMARY KEY,
    pw VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    birth DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    tel VARCHAR(20),
    addr1 VARCHAR(255),
    addr2 VARCHAR(255),
    postcode VARCHAR(10),
    regdate DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE qna (
    qno INT AUTO_INCREMENT PRIMARY KEY,
    lev INT DEFAULT 0,
    parno INT,
    title VARCHAR(255),
    content TEXT,
    author VARCHAR(255),
    resdate DATETIME DEFAULT CURRENT_TIMESTAMP,
    hits INT DEFAULT 0
);

CREATE TABLE dataroom (
    dno INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    author VARCHAR(255),
    datafile VARCHAR(255),
    resdate DATETIME DEFAULT CURRENT_TIMESTAMP,
    hits INT DEFAULT 0
);

CREATE TABLE product (
    pno INT AUTO_INCREMENT PRIMARY KEY,
    cate VARCHAR(255),
    pname VARCHAR(255),
    pcontent TEXT,
    img1 VARCHAR(255),
    img2 VARCHAR(255),
    img3 VARCHAR(255),
    resdate DATETIME DEFAULT CURRENT_TIMESTAMP,
    hits INT DEFAULT 0
);
```

<br><br><br>

## 1-4. 라이브러리 설치

```bash
npm install mysql2 sequelize express body-parser cors concurrently
npm install --save-dev sequelize-cli
npx sequelize-cli init
```

<br><br><br><br>

# 2. Next.js 설정

## 2-1. 애플리케이션 프로젝트 구조

```lua
company/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── boardController.js
│   │   ├── qnaController.js
│   │   ├── dataroomController.js
│   │   ├── productController.js
│   │   └── memberController.js
│   ├── models/
│   │   ├── board.js
│   │   ├── qna.js
│   │   ├── dataroom.js
│   │   ├── product.js
│   │   └── member.js
│   ├── services/
│   │   ├── boardService.js
│   │   ├── qnaService.js
│   │   ├── dataroomService.js
│   │   ├── productService.js
│   │   └── memberService.js
│   └── index.js
├── pages/
│   ├── api/
│   ├── index.js
│   └── ...
├── public/
│   └── ...
├── styles/
│   └── ...
├── .gitignore
├── next.config.js
├── server.js
└── package.json
```

<br><br><br>

## 2-2. 애플리케이션 프로젝트 설정

### 2-2-1. Express 서버 설정 - server.js

```js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');

const boardController = require('./controllers/boardController');
const qnaController = require('./controllers/qnaController');
const dataroomController = require('./controllers/dataroomController');
const productController = require('./controllers/productController');
const memberController = require('./controllers/memberController');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/company/backend/boards/list', boardController.getBoards);
app.get('/company/backend/boards/detail/:id', boardController.getBoard);
app.post('/company/backend/boards/insert', boardController.createBoard);
app.post('/company/backend/boards/update/:id', boardController.updateBoard);
app.post('/company/backend/boards/delete/:id', boardController.deleteBoard);

app.get('/company/backend/qna/list', qnaController.getQnas);
app.get('/company/backend/qna/detail/:id', qnaController.getQna);
app.post('/company/backend/qna/insert', qnaController.createQna);
app.post('/company/backend/qna/answer/:id', qnaController.answerQna);
app.post('/company/backend/qna/edit/:id', qnaController.editQna);
app.post('/company/backend/qna/delete/:id', qnaController.deleteQna);

app.get('/company/backend/dataroom/list', dataroomController.getDatarooms);
app.get('/company/backend/dataroom/detail/:id', dataroomController.getDataroom);
app.post('/company/backend/dataroom/upload', dataroomController.uploadDataroom);
app.post('/company/backend/dataroom/update/:id', dataroomController.updateDataroom);
app.post('/company/backend/dataroom/delete/:id', dataroomController.deleteDataroom);

app.get('/company/backend/products/list', productController.getProducts);
app.get('/company/backend/products/detail/:id', productController.getProduct);
app.post('/company/backend/products/insert', productController.createProduct);
app.post('/company/backend/products/update/:id', productController.updateProduct);
app.post('/company/backend/products/delete/:id', productController.deleteProduct);

app.get('/company/backend/members/getMemberList', memberController.getMembers);
app.get('/company/backend/members/getMember/:id', memberController.getMember);
app.post('/company/backend/members/join', memberController.createMember);
app.post('/company/backend/members/myInfoEdit/:id', memberController.updateMember);
app.post('/company/backend/members/delete/:id', memberController.deleteMember);

const PORT = 3500;

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.log(err));
```

<br><br>

### 2-2-2. 의존성 패키지 설정 - package.json 

```json
{
  "name": "company",
  "version": "1.0.0",
  "description": "Next.js and Express integration with MariaDB",
  "main": "index.js",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "backend": "node backend/index.js",
    "serve": "concurrently \"npm run backend\" \"npm run start\""
  },
  "dependencies": {
    "body-parser": "^1.20.2",
    "concurrently": "^8.2.2",
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "mysql2": "^3.10.3",
    "next": "14.2.5",
    "react": "^18",
    "react-dom": "^18",
    "sequelize": "^6.37.3"
  },
  "devDependencies": {
    "postcss": "^8",
    "sequelize-cli": "^6.6.2",
    "tailwindcss": "^3.4.1"
  }
  "author": "",
  "license": "ISC"
}
```

<br><br>

### 2-2-3. Next.js 설정 - next.config.js

- next.config.js 파일은 Next.js 설정 파일로, API 라우트를 프록시하여 Express 서버로 전달합니다.

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3500/:path*' // 백엔드로 프록시
      }
    ]
  }
}
```

<br><br>

### 2-2-4. 라우트 설정 - backend/index.js

- backend/index.js 파일은 Express 서버의 진입점 파일로, 모든 라우트와 미들웨어를 설정하고 서버를 시작합니다.

```js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');

// 컨트롤러 불러오기
const boardController = require('./controllers/boardController');
const qnaController = require('./controllers/qnaController');
const dataroomController = require('./controllers/dataroomController');
const productController = require('./controllers/productController');
const memberController = require('./controllers/memberController');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// 라우트 설정
app.get('/company/boards/list', boardController.getBoards);
app.get('/company/boards/detail/:id', boardController.getBoard);
app.post('/company/boards/insert', boardController.createBoard);
app.post('/company/boards/update/:id', boardController.updateBoard);
app.post('/company/boards/delete/:id', boardController.deleteBoard);

app.get('/company/qna/list', qnaController.getQnas);
app.get('/company/qna/detail/:id', qnaController.getQna);
app.post('/company/qna/insert', qnaController.createQna);
app.post('/company/qna/answer/:id', qnaController.answerQna);
app.post('/company/qna/edit/:id', qnaController.editQna);
app.post('/company/qna/delete/:id', qnaController.deleteQna);

app.get('/company/dataroom/list', dataroomController.getDatarooms);
app.get('/company/dataroom/detail/:id', dataroomController.getDataroom);
app.post('/company/dataroom/upload', dataroomController.uploadDataroom);
app.post('/company/dataroom/update/:id', dataroomController.updateDataroom);
app.post('/company/dataroom/delete/:id', dataroomController.deleteDataroom);

app.get('/company/products/list', productController.getProducts);
app.get('/company/products/detail/:id', productController.getProduct);
app.post('/company/products/insert', productController.createProduct);
app.post('/company/products/update/:id', productController.updateProduct);
app.post('/company/products/delete/:id', productController.deleteProduct);

app.get('/company/members/getMemberList', memberController.getMembers);
app.get('/company/members/getMember/:id', memberController.getMember);
app.post('/company/members/join', memberController.createMember);
app.post('/company/members/myInfoEdit/:id', memberController.updateMember);
app.post('/company/members/delete/:id', memberController.deleteMember);

const PORT = 3500;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log(err));
```

<br><br>

### 2-2-5. 메인 페이지 설정 - pages/index.js

- pages/index.js 파일은 Next.js 애플리케이션의 메인 페이지입니다. 기본적인 환영 메시지를 출력합니다.

```jsx
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Company</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to Company</h1>
        <p>Next.js와 Express로 구축한 웹 애플리케이션입니다.</p>
      </main>
    </div>
  );
}
```
<br><br>

### 2-2-6. 데이터베이스 설정 - config/database.js

```js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('company', 'root', '1234', {
  host: 'localhost',
  dialect: 'mariadb',
  port: 3307
});

module.exports = sequelize;
```

<br><br>

## 2-3. 스타일 설정

### 2-3-1. styles/globals.css

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

<br><br>

### 2-3-2. pages/_app.js - 전역 스타일

```jsx
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

<br><br><br>

# 3. Model(DTO) 작성

## 3-1. Board Models (models/board.js)

```js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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

module.exports = Board;
```

<br><br>

## 3-2. Qna Model (models/qna.js)

```js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Qna = sequelize.define('Qna', {
    qno: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    lev: { type: DataTypes.INTEGER, defaultValue: 0 },
    parno: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    author: { type: DataTypes.STRING },
    resdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    hits: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
    tableName: 'qna',
    timestamps: false
});

module.exports = Qna;
```

<br><br>

## 3-3. Dataroom Model (models/dataroom.js)

```js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dataroom = sequelize.define('Dataroom', {
    dno: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    author: { type: DataTypes.STRING },
    datafile: { type: DataTypes.STRING },
    resdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    hits: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
    tableName: 'dataroom',
    timestamps: false
});

module.exports = Dataroom;
```

<br><br>

## 3-4. Product Model (models/product.js)

```js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    pno: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cate: { type: DataTypes.STRING },
    pname: { type: DataTypes.STRING },
    pcontent: { type: DataTypes.TEXT },
    img1: { type: DataTypes.STRING },
    img2: { type: DataTypes.STRING },
    img3: { type: DataTypes.STRING },
    resdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    hits: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
    tableName: 'product',
    timestamps: false
});

module.exports = Product;
```

<br><br>

## 3-5. Member Model (models/member.js)

```js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Member = sequelize.define('Member', {
    id: { type: DataTypes.STRING, primaryKey: true },
    pw: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    birth: { type: DataTypes.DATE, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    tel: { type: DataTypes.STRING },
    addr1: { type: DataTypes.STRING },
    addr2: { type: DataTypes.STRING },
    postcode: { type: DataTypes.STRING },
    regdate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'member',
    timestamps: false
});

module.exports = Member;
```

<br><br><br>

# 4. Service 작성

## 4-1. Board Services (services/boardService.js)

```js
const Board = require('../models/board');

async function getAllBoards() {
  return await Board.findAll();
}

async function getBoardById(id) {
  return await Board.findByPk(id);
}

async function createBoard(data) {
  return await Board.create(data);
}

async function updateBoard(id, data) {
  return await Board.update(data, { where: { no: id } });
}

async function deleteBoard(id) {
  return await Board.destroy({ where: { no: id } });
}

module.exports = { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard };
```


<br><br>

## 4-2. Qna Service (services/qnaService.js)

```js
const Qna = require('../models/qna');

async function getAllQnas() {
    return await Qna.findAll();
}

async function getQnaById(id) {
    return await Qna.findByPk(id);
}

async function createQna(data) {
    return await Qna.create(data);
}

async function answerQna(id, data) {
    return await Qna.update(data, { where: { qno: id } });
}

async function editQna(id, data) {
    return await Qna.update(data, { where: { qno: id } });
}

async function deleteQna(id) {
    return await Qna.destroy({ where: { qno: id } });
}

module.exports = { getAllQnas, getQnaById, createQna, answerQna, editQna, deleteQna };
```


<br><br>

## 4-3. Dataroom Service (services/dataroomService.js)

```js
const Dataroom = require('../models/dataroom');

async function getAllDatarooms() {
    return await Dataroom.findAll();
}

async function getDataroomById(id) {
    return await Dataroom.findByPk(id);
}

async function uploadDataroom(data) {
    return await Dataroom.create(data);
}

async function updateDataroom(id, data) {
    return await Dataroom.update(data, { where: { dno: id } });
}

async function deleteDataroom(id) {
    return await Dataroom.destroy({ where: { dno: id } });
}

module.exports = { getAllDatarooms, getDataroomById, uploadDataroom, updateDataroom, deleteDataroom };
```

<br><br>

## 4-4. Product Service (services/productService.js)

```js
const Product = require('../models/product');

async function getAllProducts() {
    return await Product.findAll();
}

async function getProductById(id) {
    return await Product.findByPk(id);
}

async function createProduct(data) {
    return await Product.create(data);
}

async function updateProduct(id, data) {
    return await Product.update(data, { where: { pno: id } });
}

async function deleteProduct(id) {
    return await Product.destroy({ where: { pno: id } });
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
```


<br><br>

## 4-5. Member Service (services/memberService.js)

```js
const Member = require('../models/member');

async function getAllMembers() {
    return await Member.findAll();
}

async function getMemberById(id) {
    return await Member.findByPk(id);
}

async function createMember(data) {
    return await Member.create(data);
}

async function updateMember(id, data) {
    return await Member.update(data, { where: { id: id } });
}

async function deleteMember(id) {
    return await Member.destroy({ where: { id: id } });
}

module.exports = { getAllMembers, getMemberById, createMember, updateMember, deleteMember };
```


# 5. Controller 작성

## 5-1. Board Controllers (controllers/boardController.js)

```js
const boardService = require('../services/boardService');

async function getBoards(req, res) {
  const boards = await boardService.getAllBoards();
  res.json(boards);
}

async function getBoard(req, res) {
  const board = await boardService.getBoardById(req.params.id);
  res.json(board);
}

async function createBoard(req, res) {
  const board = await boardService.createBoard(req.body);
  res.json(board);
}

async function updateBoard(req, res) {
  const board = await boardService.updateBoard(req.params.id, req.body);
  res.json(board);
}

async function deleteBoard(req, res) {
  await boardService.deleteBoard(req.params.id);
  res.sendStatus(204);
}

module.exports = { getBoards, getBoard, createBoard, updateBoard, deleteBoard };
```


<br><br>

## 5-2. Qna Controller (controllers/qnaController.js)

```js
const qnaService = require('../services/qnaService');

async function getQnas(req, res) {
    const qnas = await qnaService.getAllQnas();
    res.json(qnas);
}

async function getQna(req, res) {
    const qna = await qnaService.getQnaById(req.params.id);
    res.json(qna);
}

async function createQna(req, res) {
    const qna = await qnaService.createQna(req.body);
    res.json(qna);
}

async function answerQna(req, res) {
    const qna = await qnaService.answerQna(req.params.id, req.body);
    res.json(qna);
}

async function editQna(req, res) {
    const qna = await qnaService.editQna(req.params.id, req.body);
    res.json(qna);
}

async function deleteQna(req, res) {
    await qnaService.deleteQna(req.params.id);
    res.sendStatus(204);
}

module.exports = { getQnas, getQna, createQna, answerQna, editQna, deleteQna };
```


<br><br>

## 5-3. Dataroom Controller (controllers/dataroomController.js)

```js
const dataroomService = require('../services/dataroomService');

async function getDatarooms(req, res) {
    const datarooms = await dataroomService.getAllDatarooms();
    res.json(datarooms);
}

async function getDataroom(req, res) {
    const dataroom = await dataroomService.getDataroomById(req.params.id);
    res.json(dataroom);
}

async function uploadDataroom(req, res) {
    const dataroom = await dataroomService.uploadDataroom(req.body);
    res.json(dataroom);
}

async function updateDataroom(req, res) {
    const dataroom = await dataroomService.updateDataroom(req.params.id, req.body);
    res.json(dataroom);
}

async function deleteDataroom(req, res) {
    await dataroomService.deleteDataroom(req.params.id);
    res.sendStatus(204);
}

module.exports = { getDatarooms, getDataroom, uploadDataroom, updateDataroom, deleteDataroom };
```


<br><br>

## 5-4. Product Controller (controllers/productController.js)

```js
const productService = require('../services/productService');

async function getProducts(req, res) {
    const products = await productService.getAllProducts();
    res.json(products);
}

async function getProduct(req, res) {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
}

async function createProduct(req, res) {
    const product = await productService.createProduct(req.body);
    res.json(product);
}

async function updateProduct(req, res) {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(product);
}

async function deleteProduct(req, res) {
    await productService.deleteProduct(req.params.id);
    res.sendStatus(204);
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
```


<br><br>

## 5-5. Member Controller (controllers/memberController.js)

```js
const memberService = require('../services/memberService');

async function getMembers(req, res) {
    const members = await memberService.getAllMembers();
    res.json(members);
}

async function getMember(req, res) {
    const member = await memberService.getMemberById(req.params.id);
    res.json(member);
}

async function createMember(req, res) {
    const member = await memberService.createMember(req.body);
    res.json(member);
}

async function updateMember(req, res) {
    const member = await memberService.updateMember(req.params.id, req.body);
    res.json(member);
}

async function deleteMember(req, res) {
    await memberService.deleteMember(req.params.id);
    res.sendStatus(204);
}

module.exports = { getMembers, getMember, createMember, updateMember, deleteMember };
```

<br><br>

## 5-6. Email Ciontroller (controllers/emailController.js)

```js
const nodemailer = require('nodemailer');

// 이메일 전송 설정
const transporter = nodemailer.createTransport({
  service: 'gmail', // 사용하는 이메일 서비스 (예: 'gmail')
  auth: {
    user: 'your-email@gmail.com', // 발신자 이메일
    pass: 'your-email-password'    // 발신자 이메일 비밀번호
  }
});

exports.sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    // 이메일 전송
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to,
      subject,
      text,
      html
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
```

<br><br><br>

# 6. 빌드(Build) 및 실행

## 1단계: 프로젝트 디렉토리로 이동

- 터미널을 열고 프로젝트 디렉토리로 이동합니다.

```bash
cd company
```

<br><br>

## 2단계: 빌드 실행

- Next.js 애플리케이션을 빌드합니다. 이 명령어는 out 디렉토리에 빌드된 파일들을 생성합니다.

**NPM을 사용하는 경우**

```bash
npm run build
```

<br>

**Yarn을 사용하는 경우**

```bash
yarn build
```

<br><br>

## 3단계: 빌드 결과 확인

- 빌드가 완료되면, out 디렉토리에 빌드된 파일들이 생성됩니다. 이 파일들은 프로덕션 환경에서 사용될 것입니다.

<br><br>

## 4단계: 빌드된 애플리케이션 실행

- 빌드된 애플리케이션을 실행하려면 next start 명령어를 사용합니다.

**NPM을 사용하는 경우**

```bash
npm run start
```

<br>

**Yarn을 사용하는 경우**

```bash
yarn start
```

<br><br>

## 5단계: Express 서버 실행

- Next.js 애플리케이션과 함께 Express 서버도 실행해야 합니다. 이를 위해 backend 디렉토리의 index.js 파일을 실행합니다.

```bash
node backend/index.js
```

<br>

**두 서버를 동시에 실행할 경우**

```bash
npm run serve
```


