const mongoose = require('mongoose');
const router = require('../routes/products.routes');
const Schema = mongoose.Schema


const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
        },
        price: {
            type: Number,
            required: true
        },
        imageURL: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;




