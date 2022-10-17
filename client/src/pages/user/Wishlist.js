import React, { useState, useEffect } from "react";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col,
} from "reactstrap";
import FooterEcommerce from "components/Footers/FooterEcommerce.js";
import WhiteNavbar2 from "../../components/nav/WhiteNavbar";
import {Link} from "react-router-dom";
import WishlistProductCard from "../../components/cards/WishlistProductCard";
import UserNav from "../../components/nav/UserNav";
import FooterBlack from "../../components/Footers/FooterBlack";



const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = () =>
        getWishlist(user.token).then((res) => {
            // console.log(res);
            setWishlist(res.data.wishlist);
        });

    const handleRemove = (productId) =>
        removeWishlist(productId, user.token).then((res) => {
            loadWishlist();
        });


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
                            Your Wishlist
                        </h3>
                        <Row>
                            <Col md="3">
                                <UserNav/>
                            </Col>



                            <Col md="9">

                                <h4 className="title" style={{textAlign: 'center', marginTop: '30px'}}>
                                    <small>{wishlist.length > 0 ? "Wishlist" : "No products in wishlist"}
                                    </small>
                                </h4>

                                <div className="products">
                                    <Row>

                                        {wishlist.map((product) => (
                                            <Col md="4" key={product._id}>
                                               <span onClick={() => handleRemove(product._id)} className="btn btn-sm float-right" style={{backgroundColor: '#fff', marginLeft: '6px', border: 'none'}}>
                                                    <DeleteOutlined className="text-danger" />
                                                </span>
                                                <WishlistProductCard product={product} />

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

export default Wishlist;
