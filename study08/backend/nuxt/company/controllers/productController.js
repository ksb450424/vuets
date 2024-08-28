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