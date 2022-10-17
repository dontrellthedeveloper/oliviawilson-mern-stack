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
                <div className="section section-gray">
                    <Container>
                        <h3 className="section-title">Your Wishlist</h3>
                        <Row>
                            <Col md="3">
                                <Card className="card-refine" style={{marginTop: '70px'}}>
                                    <div
                                        aria-expanded={true}
                                        aria-multiselectable={true}
                                        className="panel-group"
                                        id="accordion"
                                    >

                                        <CardHeader className="card-collapse" id="priceRanger" role="tab">
                                            <h5 className="mb-0 panel-title">
                                                <Link to='/user/history'
                                                >
                                                    Purchase History

                                                </Link>
                                            </h5>
                                        </CardHeader>

                                        <CardHeader className="card-collapse" id="designer" role="tab">
                                            <h5 className="mb-0 panel-title">
                                                <Link to='/user/password'
                                                >
                                                    Change Password

                                                </Link>
                                            </h5>
                                        </CardHeader>

                                        <CardHeader className="card-collapse" id="clothingGear" role="tab">
                                            <h5 className="mb-0 panel-title">
                                                <Link to='/user/wishlist'
                                                >
                                                    Wishlist
                                                </Link>
                                            </h5>
                                        </CardHeader>

                                    </div>
                                </Card>
                                {/* end card */}
                            </Col>



                            <Col md="9" style={{marginTop: '70px'}}>
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
                <FooterEcommerce />
            </div>
        </>
    );
}

export default Wishlist;
