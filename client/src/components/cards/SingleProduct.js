import React, { useState } from "react";
import { Tabs, Tooltip } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";


import {
    Button,
    Card,
    Row,
    Col,
    Carousel,
    CarouselItem,
} from "reactstrap";

const { TabPane } = Tabs;

// this is childrend component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
    const [tooltip, setTooltip] = useState("Click to add");
    const [wishlistTip, setWishlistTip] = useState("Add to Wishlist");
    const [wishlistTip2, setWishlistTip2] = useState("Login to Add to Wishlist");

    // carousel states and functions
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [animating, setAnimating] = React.useState(false);
    const onExiting = () => {
        setAnimating(true);
    };
    const onExited = () => {
        setAnimating(false);
    };
    const next = () => {
        if (animating) return;
        const nextIndex =
            activeIndex === images.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };
    const previous = () => {
        if (animating) return;
        const nextIndex =
            activeIndex === 0 ? images.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };
    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };


    // redux
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    // router
    let history = useHistory();

    const { title, images, description, _id } = product;



    const handleAddToCart = () => {
        // create cart array
        let cart = [];
        if (typeof window !== "undefined") {
            // if cart is in local storage GET it
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            // push new product to cart
            cart.push({
                ...product,
                count: 1,
            });
            // remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);
            // save to local storage
            // console.log('unique', unique)
            localStorage.setItem("cart", JSON.stringify(unique));
            // show tooltip
            setTooltip("Added");

            // add to reeux state
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });
            // show cart items in side drawer
            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
    };


    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user.token).then((res) => {
            console.log("ADDED TO WISHLIST", res.data);
            toast.success("Added to wishlist");
            setWishlistTip("Added to Wishlist");
            history.push("/user/wishlist");
        });
    };


    return (
        <>
            <Col md="7" sm="6">

                <div className="ml-auto mr-auto" id="carousel">
                    <Card className="page-carousel">

                        {images && images.length ? (
                        <Carousel
                            activeIndex={activeIndex}
                            next={next}
                            previous={previous}
                            showArrows={true}
                        >
                            {images && images.map((i) => {
                                return (
                                    <CarouselItem
                                        onExiting={onExiting}
                                        onExited={onExited}
                                        key={i.public_id}
                                    >
                                        <img src={i.url} alt={i.public_id} />
                                    </CarouselItem>
                                );
                            })}
                            <a
                                className="left carousel-control carousel-control-prev"
                                data-slide="prev"
                                href="#pablo"
                                onClick={(e) => {
                                    e.preventDefault();
                                    previous();
                                }}
                                role="button"
                            >
                                <span className="fa fa-angle-left" />
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className="right carousel-control carousel-control-next"
                                data-slide="next"
                                href="#pablo"
                                onClick={(e) => {
                                    e.preventDefault();
                                    next();
                                }}
                                role="button"
                            >
                                <span className="fa fa-angle-right" />
                                <span className="sr-only">Next</span>
                            </a>
                        </Carousel>
                        ) : (
                            <Card cover={<img src='' className="mb-3 card-image" />}></Card>
                        )}

                    </Card>
                </div>
                {/* end carousel */}
            </Col>



            <Col md="5" sm="6" style={{textAlign: 'center', marginTop: '40px'}}>


                <h2>{title}</h2>



                <ProductListItems product={product} />

                {product && product.ratings && product.ratings.length > 0 ? (
                    showAverage(product)
                ) : (
                    <div className="text-center pt-1 pb-1">No rating yet</div>
                )}

                <hr/>





                <div style={{textAlign: 'center', margin: '20px'}}>
                    <div className="row">
                        <div className="col-md-6">

                            {user ? (

                            <Tooltip title={wishlistTip}>
                                <Button
                                    onClick={handleAddToWishlist}
                                    disabled={!user}
                                    className="btn-just-icon btn-border mr-1 mb-3"
                                    color="pinterest"
                                    // style={{border: 'none'}}
                                >
                                    <i className="fa fa-heart" />
                                </Button>

                            </Tooltip>
                            ) : (
                                <Tooltip title={wishlistTip2}>
                                    <Button
                                        // disabled={!user}
                                        className="btn-just-icon btn-border mr-1 mb-3"
                                        color="pinterest"
                                        // style={{border: 'none'}}
                                    >
                                        <i className="fa fa-heart" />
                                    </Button>
                                </Tooltip>

                            )}

                            <br/>

                            {user ? "Add to Wishlist" : "Login to add to wishlist"}

                        </div>
                        <div className="col-md-6">

                        <RatingModal >
                            <StarRating
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>
                            <br/>
                            {user ? "Leave rating" : "Login to leave rating"}
                        </div>
                    </div>

                </div>

                <hr/>
                <Row>
                    <Col className="offset-md-5" md="7" sm="8" style={{margin: '10px auto'}}>
                        <Button
                            onClick={handleAddToCart} disabled={product.quantity < 1}

                            block className="btn-round" color="dark">
                            {/*Add to Cart  */}
                            {product.quantity < 1 ? "Out of Stock" : "Add To Cart"}
                            <i className="fa fa-chevron-right" />
                        </Button>
                    </Col>
                </Row>
            </Col>
        </>
    );
};

export default SingleProduct;