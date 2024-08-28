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