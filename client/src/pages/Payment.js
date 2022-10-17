import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import "../stripe.css";
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import FooterBlack from "components/Footers/FooterBlack.js";
import WhiteNavbar2 from "../components/nav/WhiteNavbar";



// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


const Payment = () => {


    document.documentElement.classList.remove("nav-open");

    return (
        <>
            <WhiteNavbar2 />
            <div className="main">
                <div className="section" style={{marginTop: '40px'}}>
                    <Container>


                        <Row>
                            <Col md="12">
                                <h4 className="title">Complete Your Purchase</h4>
                            </Col>


                            <div className="container p-5 text-center">
                                <Elements stripe={promise}>
                                    <div className="col-md-8 offset-md-2">
                                        <StripeCheckout />
                                    </div>
                                </Elements>
                            </div>


                        </Row>



                    </Container>
                </div>


            </div>

            <FooterBlack />
        </>
    );
}

export default Payment;
