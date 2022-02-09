import { Component } from 'react'
import { Container, Button, Modal, Dropdown } from 'react-bootstrap'
import ProductService from '../../../service/products.service'
import ProductCard from '../ProductCard/ProductCard'
import { Row, Col } from 'react-bootstrap'
import ProductForm from '../ProductForm/ProductForm'
import Searchbar from '../Searchbar/Searchbar'
import Select from 'react-select'
import './Products.css'


class Products extends Component {

    constructor() {
        super()
        this.state = {
            products: [],
            showForm: false,
            selectedOption: null,
            searchString: "",
        }

        this.productService = new ProductService()
    }

    componentDidMount() {
        this.chargingProducts()
    }

    toggleModalForm(value) {
        this.setState({ showForm: value })
    }

    chargingProducts() {
        this.productService
            .getProducts()
            .then(response => this.setState({ products: response.data.response }))
            .catch(err => console.log(err))
    }

    sortList(num) {
        let productsSort = []
        switch (num) {
            case '1':
                productsSort = this.state.products.sort(function (a, b) { return a.name.localeCompare(b.name) })
                break
            case '2':
                productsSort = this.state.products.sort(function (a, b) { return b.name.localeCompare(a.name) })
                break
            case '3':
                productsSort = this.state.products.sort(function (a, b) { return a.price - b.price })
                break
            default: productsSort = this.state.products

        }
        this.setState({ products: productsSort })
    }

    handleChange = async selectedOption => {
        selectedOption.length !== 0 ? this.setState({ products: selectedOption }) : this.chargingProducts()
    }

    filterProducts = searchString => {
        searchString.length !== 0 ? this.filterList(searchString) : this.clearFilter()
    }

    clearFilter() {
        this.setState({ searchString: "" })
        this.chargingProducts()
    }

    filterList(searchString) {
        let products = this.state.products
        let search = searchString.trim().toLowerCase()

        if (searchString.length < this.state.searchString.length) {
            this.chargingProducts()
        }

        if (searchString.length > 0) {
            products = products.filter(elm => { return elm.name.toLowerCase().match(search) })
        }

        this.setState({ products: products })
        this.setState({ searchString: searchString })
    }

    render() {

        return (
            <>
                <Container>
                    <h1 style={{ fontFamily: 'Amatic SC, cursive', display: 'flex' }} className="title" >  <div> - MEX
                        <img className="logo-flag"
                            src="https://res.cloudinary.com/dxslsbznp/image/upload/v1644248928/mexico_cg9bfp.png" alt="flag"
                        />
                    </div> STORE -
                    </h1>

                    <div className='searchBarItems' style={{ fontFamily: 'Karla, sans-serif' }}>
                        {this.state.searchString !== "" ? <p className='article'> Artículos encontrados: {this.state.products.length}</p> : ""}
                        {this.state.searchString !== "" ? <p className='intermediate'> || </p> : ""}
                        {this.state.searchString !== "" ? <p className='searchResults'> Búsqueda de resultados para: "{this.state.searchString}"</p> : ""}
                        <Searchbar onChance={this.filterProducts} />
                    </div>

                    <section className='buttons-index'>
                        <Row>
                            <Col >
                                <Button className="button-new-product" onClick={() => this.toggleModalForm(true)} style={{ fontFamily: 'Amatic SC, cursive' }} variant="success">Añadir nuevo producto</Button>
                            </Col>

                            <Col>
                                <Dropdown className="dropdown" style={{ fontFamily: 'Amatic SC, cursive' }}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown">
                                        Productos  ({this.state.products.length})
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Select
                                            isMulti
                                            options={this.state.products}
                                            onChange={this.handleChange}
                                            value={this.state.products.name} >
                                        </Select>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>

                            <Col>
                                <Dropdown className="Dropdown" style={{ fontFamily: 'Amatic SC, cursive' }}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown">
                                        Ordenar por:
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => this.sortList("1")}>Orden alfabético ascendente</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.sortList("2")}>Orden alfabético descente</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.sortList("3")}>Precio ascendente</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>

                        </Row>
                        <br />
                    </section>
                    <Row >
                        {this.state.products?.map(elm => <ProductCard key={elm._id} {...elm} refreshList={() => this.chargingProducts()} />)}
                    </Row>
                </Container>

                <Modal style={{ fontFamily: 'Karla, sans-serif' }} show={this.state.showForm} onHide={() => this.toggleModalForm()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nuevo producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProductForm closeModal={() => this.toggleModalForm(false)} refreshList={() => this.chargingProducts()} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}


export default Products
