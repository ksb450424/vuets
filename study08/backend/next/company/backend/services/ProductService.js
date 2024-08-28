const Product = require('../models/Product');

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