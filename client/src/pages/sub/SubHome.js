import React, { useState, useEffect } from "react";
import { getSub } from "../../functions/sub";
import ProductCard from "../../components/cards/ProductCard";
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import FooterEcommerce from "components/Footers/FooterEcommerce.js";
import WhiteNavbar2 from "../../components/nav/WhiteNavbar";


const SubHome = ({match}) => {
    const [sub, setSub] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getSub(slug).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setSub(res.data.sub);
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
                            {sub.name}
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
                                        <small> {products.length} Products in "{sub.name}" sub category
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

export default SubHome;
