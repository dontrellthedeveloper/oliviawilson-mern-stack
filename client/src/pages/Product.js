import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import {
    Card,
    CardHeader,
    CardBody,
    UncontrolledCollapse,
    Container,
    Row,
    Col,
    Collapse,
} from "reactstrap";
import FooterBlack from "components/Footers/FooterBlack.js";
import WhiteNavbar2 from "../components/nav/WhiteNavbar";
import SingleProduct from "../components/cards/SingleProduct";
import ProductCard from "../components/cards/ProductCard";
import {Link} from "react-router-dom";



const Product = ({ match }) => {
    // collapse states and functions
    const [collapseTwo, setCollapseTwo] = React.useState(false);
    const [priceRange, setPriceRange] = React.useState(true);


    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);
    const [star, setStar] = useState(0);
    // redux
    const { user } = useSelector((state) => ({ ...state }));

    const { slug } = match.params;


    useEffect(() => {
        loadSingleProduct();
    }, [slug]);

    useEffect(() => {
        if (product.ratings && user) {
            let existingRatingObject = product.ratings.find(
                (ele) => ele.postedBy.toString() === user._id.toString()
            );
            existingRatingObject && setStar(existingRatingObject.star); // current user's star
        }
    });

    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
            setProduct(res.data);
            // load related
            getRelated(res.data._id).then((res) => setRelated(res.data));
        });
    };

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        console.table(newRating, name);
        productStar(name, newRating, user.token).then((res) => {
            console.log("rating clicked", res.data);
            loadSingleProduct(); // if you want to show updated rating in real time
        });
    };



    const {
        category,
        subs,
        title,
        description
    } = product;

    {category && (
    console.log(category.name)
    )}



    document.documentElement.classList.remove("nav-open");


    return (
        <>
            <WhiteNavbar2 />
            <div className="main">
                <div className="section" style={{marginTop: '70px', background: '#eeeeee'}}>
                    <Container>

                        <Row className="title-row">

                            <Col className="ml-auto" md="6">
                                <div className="pull-right">

                                    {category && subs && (
                                        <span className="text-muted">

                                            <Link
                                                to={`/shop`}
                                                style={{color: '#a1a0a1',fontWeight: '600'}}
                                                className="label label-default label-pill pull-xs-right"
                                            >
                                                All Products /
                                            </Link>

                                            {" "}
                                            <Link
                                                style={{color: '#a1a0a1',fontWeight: '600', textTransform: 'capitalize'}}
                                                to={`/category/${category.slug}`}
                                                className="label label-default label-pill pull-xs-right"
                                            >
                                                {category.name} /
                                            </Link>
                                            {" "}
                                            {subs.slice(0, 1).map((s) => (
                                                <Link
                                                    key={s._id}
                                                    style={{color: '#a1a0a1',fontWeight: '600', textTransform: 'capitalize'}}
                                                    to={`/sub/${s.slug}`}
                                                    className="label label-default label-pill pull-xs-right"
                                                >
                                                    {s.name} /
                                                </Link>
                                            ))}
                                            {" "}
                                            <span
                                                style={{color: '#000',fontWeight: '600'}}
                                            >

                                            {title}
                                            </span>
                                        </span>
                                    )}

                                </div>
                            </Col>
                        </Row>


                        <Row>

                            <SingleProduct
                                product={product}
                                onStarClick={onStarClick}
                                star={star}
                            />
                        </Row>



                    </Container>
                </div>


                {/*<ProductDescription />*/}
                <div className="section">
                    <Container>


                        <div className="faq" style={{textAlign: 'center'}}>


                            <div id="acordeon">
                                <div aria-multiselectable={true} id="accordion" role="tablist">
                                    <Card className="no-transition">
                                        <CardHeader
                                            className="card-collapse"
                                            id="priceRanger"
                                            role="tab"
                                        >
                                            <h5 className="mb-0 panel-title">
                                                <a
                                                    aria-expanded={priceRange}
                                                    href="#pablo"

                                                >
                                                    Description
                                                </a>
                                            </h5>
                                        </CardHeader>
                                        <Collapse isOpen={priceRange}>
                                            <CardBody>


                                                    {description}

                                            </CardBody>
                                        </Collapse>



                                        <CardHeader
                                            className="card-collapse"
                                            id="headingTwo"
                                            role="tab"
                                        >
                                            <h5 className="mb-0 panel-title">
                                                <a
                                                    aria-expanded={collapseTwo}
                                                    href="#pablo"
                                                    id="collapseTwo"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCollapseTwo(!collapseTwo);
                                                    }}
                                                >
                                                    More Information{" "}
                                                    <i className="nc-icon nc-minimal-down" />
                                                </a>
                                            </h5>
                                        </CardHeader>
                                        <UncontrolledCollapse
                                            aria-labelledby="headingTwo"
                                            role="tabpanel"
                                            toggler="#collapseTwo"
                                        >
                                            <CardBody>
                                                Email us at info@oliviawilson.com to learn more about this product.

                                            </CardBody>
                                        </UncontrolledCollapse>


                                    </Card>
                                </div>
                                {/* end acordeon */}
                            </div>
                        </div>

                    </Container>
                </div>


                {/*<Related product />*/}
                <div className="section" style={{ backgroundColor: '#eeeeee'}}>
                    <Container>
                        <Row>
                            <Col md="12">
                                <h3
                                    style={{textAlign: 'center', marginBottom: '50px', textTransform: 'capitalize'}}
                                    className="section-title">
                                    Related Products
                                </h3>
                            </Col>

                            {related.length ? (
                                    related.map((r) => (
                            <Col md="4" sm="4" key={r._id}>
                                <ProductCard product={r} />
                            </Col>
                                    ))
                            ) : (
                                <div className="text-center col">No Products Found</div>
                            )}
                        </Row>
                    </Container>
                </div>

            </div>
            <FooterBlack />
        </>
    );
}

export default Product;
