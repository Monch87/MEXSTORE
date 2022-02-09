const express = require('express')
const router = express.Router()
const Product = require('./../models/product.model')


router.get('/getAllProducts', (req, res) => {

    Product
        .find()
        .then(response => res.json({ response }))
        .catch(err => res.status(500).json({ code: 500, message: 'Error fetching products', err }))
})


router.post('/newProduct', (req, res) => {

    Product
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error creating products', err }))
})


router.delete('/deleteProduct/:product_id', (req, res) => {

    const product_id = req.params.product_id

    Product
        .findByIdAndDelete(product_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting products', err }))
})


module.exports = router