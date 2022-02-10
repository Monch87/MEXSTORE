import { Component } from 'react'
import ProductService from '../../../service/products.service'
import { Container, Form, Button } from 'react-bootstrap'


class ProductForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: {
                name: '',
                label: '',
                price: '',
                imageURL: '',
            },

            isUploading: false
        }

        this.productService = new ProductService()
    }

    handleInputChange(e) {
        const { name, value } = e.target
        this.setState({ product: { ...this.state.product, [name]: value } })
    }

    handleSubmit(e) {
        this.setState({ product: { ...this.state.product, label: this.state.product.name } }, () => {
            e.preventDefault()
            this.productService
                .createNewProduct(this.state.product)
                .then(() => this.finishAction())
                .catch(error => console.log(error.response.data))
        }
        )
    }

    finishAction() {
        this.props.closeModal()
        this.props.refreshList()
    }

    render() {

        return (
            <Container style={{ height: '300px', fontFamily: 'Karla, sans-serif' }}>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Group>
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control type="text" name="name" value={this.state.product.name} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Precio(€):</Form.Label>
                        <Form.Control type="Number" name="price" value={this.state.product.price} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Imagen(URL):</Form.Label>
                        <Form.Control type="text" name="imageURL" value={this.state.product.imageURL} onChange={e => this.handleInputChange(e)} />
                    </Form.Group>
                    <br />
                    <Button style={{ fontFamily: 'Karla, sans-serif' }} variant="primary" className="btn btn-dark" type="submit">Agregar</Button>
                </Form>
            </Container>
        )
    }
}


export default ProductForm
