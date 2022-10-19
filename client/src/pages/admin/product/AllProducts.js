import React, { useEffect, useState } from "react";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import FooterEcommerce from "components/Footers/FooterEcommerce.js";
import WhiteNavbar2 from "../../../components/nav/WhiteNavbar";
import AdminNav from "../../../components/nav/AdminNav";
import FooterBlack from "../../../components/Footers/FooterBlack";



const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };


    const handleRemove = (slug) => {
        // let answer = window.confirm("Delete?");
        if (window.confirm("Delete?")) {
            // console.log("send delete request", slug);
            removeProduct(slug, user.token)
                .then((res) => {
                    loadAllProducts();
                    toast.error(`${res.data.title} is deleted`);
                })
                .catch((err) => {
                    if (err.response.status === 400) toast.error(err.response.data);
                    console.log(err);
                });
        }
    };



    document.documentElement.classList.remove("nav-open");



    return (
        <>
            <WhiteNavbar2 />
            <div className="wrapper">

                {/* section */}
                <div className="section section-gray" style={{minHeight: '100vh'}}>
                    <Container>
                        <h3
                            style={{textAlign: 'center',  textTransform: 'capitalize', marginTop: '40px'}}
                            className="section-title">
                            All Products
                        </h3>
                        <Row>
                            <Col md="3" >
                                <AdminNav/>
                            </Col>



                            <Col md="9" style={{marginTop: '30px'}}>
                                <div className="products">
                                    <Row>

                                        {products.map((product) => (

                                        <Col md="4" sm="4" key={product._id}>
                                            <AdminProductCard
                                                product={product}
                                                handleRemove={handleRemove}
                                            />
                                        </Col>

                                        ))}


                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* section */}
                <FooterBlack />
            </div>
        </>
    );
}

export default AllProducts;
