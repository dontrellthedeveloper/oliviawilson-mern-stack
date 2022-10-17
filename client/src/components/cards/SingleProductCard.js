import React, { useState } from "react";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";


const ProductCard = ({ product }) => {
    const [tooltip, setTooltip] = useState("Click to add");

    // redux
    // const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

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
                            <img
                                alt="..."
                                className="img-rounded img-responsive"
                                src={images && images.length ? images[0].url : "laptop"}
                            />
                        </Link>

                        <Tooltip title={tooltip}>
                            <Button
                                onClick={handleAddToCart} disabled={product.quantity < 1}
                                className="btn-round mr-1 mb-3 show-image_btn"
                                color="default"
                                outline
                                type="button"
                            >
                                {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
                            </Button>
                        </Tooltip>
                    </div>

                    {product && product.ratings && product.ratings.length > 0 ? (
                        showAverage(product)
                    ) : (
                        <div className="text-center pt-1 pb-3">No rating yet</div>
                    )}

                    <CardBody>
                        <div className="card-description">
                            <CardTitle tag="h5">{title}</CardTitle>
                            <p className="card-description">
                                {`${description && description.substring(0, 40)}...`}
                            </p>
                        </div>
                        <div className="price">
                            <span className="mr-1">{price}</span>
                        </div>
                    </CardBody>
                </div>
            </Card>
        </>
    );
};

export default ProductCard;
