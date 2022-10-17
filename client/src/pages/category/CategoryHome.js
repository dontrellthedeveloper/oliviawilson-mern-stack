import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import FooterEcommerce from "components/Footers/FooterEcommerce.js";
import WhiteNavbar2 from "../../components/nav/WhiteNavbar";

const CategoryHome = ({match}) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getCategory(slug).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setCategory(res.data.category);
            setProducts(res.data.products);
            setLoading(false);
        });
    }, []);



    return (
        <>

            <WhiteNavbar2 />
            <div className="wrapper">

                {/* section */}
                <div className="section section-gray">
                    <Container>
                        <h3
                            style={{textAlign: 'center', marginTop: '40px', textTransform: 'capitalize'}}
                            className="section-title">
                            {category.name}
                        </h3>
                        <Row>

                            <Col md="12" >

                                {loading ? (
                                <h4 className="title" style={{textAlign: 'center'}}>
                                    <small> Loading...
                                    </small>
                                </h4>
                                ) : (
                                <h4 className="title" style={{textAlign: 'center'}}>
                                    <small> {products.length} Products in "{category.name}" category
                                    </small>
                                </h4>
                                )}

                                <div className="products" style={{marginTop: '70px'}}>
                                    <Row>
                                        {products.map((p) => (

                                            <Col key={p._id} md="3" sm="3">
                                                <ProductCard product={p} />
                                            </Col>

                                        ))}


                                    </Row>
                                </div>
                            </Col>



                        </Row>
                    </Container>
                </div>
                {/* section */}

                {/* section */}
                <FooterEcommerce />
            </div>
        </>
    );
}

export default CategoryHome;
