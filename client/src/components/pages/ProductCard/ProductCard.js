import { Card, Col, Button } from 'react-bootstrap'
import swal from 'sweetalert'
import { Component } from 'react'
import ProductService from '../../../service/products.service'
import './ProductCard.css'


class ProductCard extends Component {

    constructor() {
        super()
        this.state = {
            product: "",
        }

        this.productService = new ProductService()
    }

    componentDidMount() {
        this.setState({ product: this.props })
    }

    deleteAlert(idSelect) {
        swal({
            title: 'Delete',
            text: 'Are you sure you want to delete this product? This action can not be undone.',
            icon: 'warning',
            buttons: ['No', 'Yes'],

        }).then(ans => {
            if (ans) {
                this.productService
                    .deleteProduct(idSelect)
                    .then(() => this.props.refreshList())
                    .catch(err => console.log(err))
                swal({ text: 'The product has been deleted successfully', icon: 'success', timer: '2000' })
            }
        })
    }

    render() {
        return (
            <Col md={4} className="product-card" style={{ fontFamily: 'Amatic SC, cursive' }}>
                <Card>
                    <Card.Img variant="top" src={this.state.product.imageURL} />
                    <Card.Body>
                        <div className="card-body">
                            <div className='informationCard'>
                                <h2 className="nameProduct"> {this.state.product.name}</h2>
                                <Button className="button" onClick={() => { this.deleteAlert(this.state.product._id) }} variant="outline-light" data-toggle="tooltip" data-placement="bottom" title="Borrar producto">
                                    <div>
                                        <img className="button-trash"
                                            src="https://res.cloudinary.com/dxslsbznp/image/upload/v1644243083/bin_ywyjyp.png" alt="trash"
                                        />
                                    </div>
                                </Button>
                            </div>
                            <br />
                            <p className="priceProduct"> €{this.state.product.price} (eur)</p>
                        </div>
                    </Card.Body>

                </Card>
            </Col>
        )
    }
}


export default ProductCard
