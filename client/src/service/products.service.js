import axios from 'axios'

class ProductService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/products`,
            withCredentials: false
        })
    }

    getProducts = () => this.api.get('/getAllProducts')
    createNewProduct = (productDetails) => this.api.post('/newProduct', productDetails)
    deleteProduct = (productId) => this.api.delete(`/deleteProduct/${productId}`)
}

export default ProductService

