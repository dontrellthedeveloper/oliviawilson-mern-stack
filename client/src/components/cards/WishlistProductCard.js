import React, { useState } from "react";
import { Tooltip } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Link, useHistory} from "react-router-dom";
import { showAverage } from "../../functions/rating";
import { addToWishlist } from "../../functions/user";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Carousel,
    CarouselItem,
} from "reactstrap";
import {toast} from "react-toastify";


const WishlistProductCard = ({ product }) => {
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






    // destructure
    const { images, title, description, slug, price } = product;
    return (
        <>

            <Card className="card-product card-plain">

                <div className="card-image">
                    <div className='show-images_container'>
                        <Link to={`/product/${slug}`}>

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
                                                <img
                                                    className="img-rounded img-responsive"
                                                    // src={images && images.length ? images[0].url : "laptop"}
                                                    src={i.url} alt={i.public_id}
                                                />
                                            </CarouselItem>
                                        );
                                    })}
                                    <button
                                        className="left carousel-control carousel-control-prev"
                                        data-slide="prev"
                                        // href="#pablo"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            previous();
                                        }}
                                        role="button"
                                    >
                                        <span className="fa fa-angle-left" />
                                        <span className="sr-only">Previous</span>
                                    </button>
                                    <button
                                        className="right carousel-control carousel-control-next"
                                        data-slide="next"
                                        // href="#pablo"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            next();
                                        }}
                                        role="button"
                                    >
                                        <span className="fa fa-angle-right" />
                                        <span className="sr-only">Next</span>
                                    </button>
                                </Carousel>
                            ) : (
                                <Card cover={<img src='' className="mb-3 card-image" />}></Card>
                            )}
                        </Link>


                        <Tooltip title={tooltip}>
                            <Button
                                onClick={handleAddToCart} disabled={product.quantity < 1}
                                className="btn-round mr-1 mb-3 show-image_btn"
                                color="default"
                                outline
                                type="button"
                                style={{fontSize: '8px'}}
                            >
                                {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
                            </Button>
                        </Tooltip>
                    </div>

                    {product && product.ratings && product.ratings.length > 0 ? (

                        showAverage(product)

                    ) : (
                        <div className="text-center pt-2 pb-1">No rating yet</div>
                    )}

                    <CardBody style={{textAlign: 'center'}}>
                        <div className="card-description" style={{marginTop: '10px'}}>
                            <CardTitle tag="h5">{title}
                                <span className="card-description" style={{marginTop: '5px'}}>
                            </span>
                            </CardTitle>

                            <CardTitle style={{marginBottom: '10px'}} tag="h5">
                                <span className="card-description" style={{marginTop: '5px'}}>


                                    <small>${price}</small>

                                </span>
                            </CardTitle>
                        </div>

                    </CardBody>
                </div>
            </Card>
        </>
    );
};

export default WishlistProductCard;
