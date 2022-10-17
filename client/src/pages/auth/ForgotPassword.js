import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    Button,
    Card,
    CardTitle,
    Form,
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";
import ColorNavbar from "components/nav/ColorNavbar.js";

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) history.push("/");
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        };

        await auth
            .sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail("");
                setLoading(false);
                toast.success("Check your email for password reset link");
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
                console.log("ERROR MSG IN FORGOT PASSWORD", error);
            });
    };


    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("register-page");
        document.body.classList.add("full-screen");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("register-page");
            document.body.classList.remove("full-screen");
        };
    });

    return (
        <>
            <ColorNavbar />
            <div className="wrapper">
                <div
                    className="page-header"
                    style={{
                        backgroundImage:
                            "url(" + require("assets/img/sections/bruno-abatti.jpg") + ")",
                    }}
                >
                    <div className="filter" />
                    <Container>
                        <Row>

                            <Col className="mr-auto" lg="12" md="12" sm="12" xs="12">
                                <Card className="card-register" style={{margin: '0 auto', backgroundColor: 'transparent'}}>
                                    <div style={{ margin: '0 auto'}}>
                                        <img src={require("assets/img/ecommerce/olivia-wilson-logo-light.png")} width='200px'  alt=""/>
                                    </div>

                                    {loading ? (
                                    <CardTitle className="text-center" tag="h3" style={{color: '#fff'}}>
                                        Forgot Password
                                    </CardTitle>
                                    ) : (
                                    <CardTitle className="text-center" tag="h3" style={{color: '#fff'}}>
                                        Forgot Password
                                    </CardTitle>
                                    )}

                                    <div className="division">

                                    </div>
                                    <Form className="register-form" onSubmit={handleSubmit}>
                                        <Input
                                            placeholder="Enter Your Email..."
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoFocus
                                            className='login-placeholder'
                                            style={{backgroundColor: 'hsla(0, 0%,100%,.25)',color: '#fff',borderRadius: '2rem', border: 'none', fontSize: '15px', padding: '25px',}}
                                        />
                                        <Button block className="btn-round" type='submit' disabled={!email} style={{padding: '12px'}} color="default">
                                            Submit
                                        </Button>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <div className="demo-footer text-center">
                        <h6 style={{color: '#fff'}}>
                            © {new Date().getFullYear()}
                            {" "}
                            | Olivia Wilson Boutique, LLC <i className="fa fa-heart heart" />
                        </h6>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
