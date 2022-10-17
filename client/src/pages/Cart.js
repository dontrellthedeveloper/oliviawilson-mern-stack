import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";
import {
    Button,
    Container,
    Row,
    Col,
    Table,
} from "reactstrap";
import FooterBlack from "components/Footers/FooterBlack.js";
import WhiteNavbar2 from "../components/nav/WhiteNavbar";



const Cart = ({ history }) => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const saveOrderToDb = () => {
        // console.log("cart", JSON.stringify(cart, null, 4));
        userCart(cart, user.token)
            .then((res) => {
                console.log("CART POST RES", res);
                if (res.data.ok) history.push("/checkout");
            })
            .catch((err) => console.log("cart save err", err));
    };

    const saveCashOrderToDb = () => {
        // console.log("cart", JSON.stringify(cart, null, 4));
        dispatch({
            type: "COD",
            payload: true,
        });
        userCart(cart, user.token)
            .then((res) => {
                console.log("CART POST RES", res);
                if (res.data.ok) history.push("/checkout");
            })
            .catch((err) => console.log("cart save err", err));
    };

    const showCartItems = () => (


        <Table className="table-shopping" responsive style={{backgroundColor: '#fff'}}>
            <thead>
                <tr>
                    <th scope="col" className="text-center">Image</th>
                    <th scope="col" className="text-center">Title</th>
                    <th scope="col" className="text-center">Price</th>
                    <th scope="col" className="text-center">Brand</th>
                    <th scope="col">Shipping</th>
                    <th scope="col" className="text-center">Count</th>
                    <th scope="col" className="text-center">Color</th>
                    <th scope="col">Remove</th>
                </tr>
            </thead>

            {cart.map((p) => (

                    <ProductCardInCheckout getTotal={getTotal()} key={p._id} p={p} />

            ))}
            <tbody>
                <tr>
                    <td colSpan="2" />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td className="td-total text-right">Total:</td>
                    <td className="td-total text-left">
                        <small>$</small>
                        {getTotal()}
                    </td>
                </tr>
            </tbody>
    </Table>



    );




    document.documentElement.classList.remove("nav-open");

    return (
        <>
            <WhiteNavbar2 />
            <div className="main">
                <div className="section section-gray" style={{minHeight: '100vh', marginTop: '0'}} >
                    <Container>

                        <h3
                            style={{textAlign: 'center', marginTop: '60px',marginBottom: '40px', textTransform: 'capitalize'}}
                            className="section-title">
                            Shopping Cart
                        </h3>

                        <Row>


                            <Col className="ml-auto mr-auto" md="9" >

                                {!cart.length ? (
                                    <p>
                                        No products in cart. <Link to="/shop">Continue Shopping.</Link>
                                    </p>
                                ) : (
                                    <>
                                        {showCartItems()}
                                    </>

                                )}


                            </Col>

                            <Col  md="3" style={{textAlign: 'center'}}>
                                <h4>Order Summary</h4>
                                <hr />
                                <h5 className="title">{cart.length} Products</h5>
                                {cart.map((c, i) => (
                                    <div key={i}>
                                        <p>
                                            {c.title} x {c.count} = ${c.price * c.count}
                                        </p>
                                    </div>
                                ))}
                                <hr />
                                Total: <b>${getTotal()}</b>
                                <hr />
                                {user ? (
                                    <>

                                        <Button
                                            onClick={saveOrderToDb}
                                            disabled={!cart.length}
                                            color="dark" size="md" type="button">
                                            Proceed to Checkout <i className="fa fa-chevron-right" />
                                        </Button>

                                        <br />
                                    </>
                                ) : (

                                    <Button
                                    color="dark" size="md" type="button">
                                    Proceed to Checkout <i className="fa fa-chevron-right" />
                                        <Link
                                        to={{
                                        pathname: "/login",
                                        state: { from: "cart" },
                                        }}
                                        >
                                        Login to Checkout
                                        </Link>

                                    </Button>
                                )}
                            </Col>
                        </Row>



                    </Container>
                </div>

            </div>
            <FooterBlack />
        </>
    );
}

export default Cart;
