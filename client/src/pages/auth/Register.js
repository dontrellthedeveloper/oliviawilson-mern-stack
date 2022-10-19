import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
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
import {Link} from "react-router-dom";


const Register = ({history}) => {
    const [email, setEmail] = useState("");

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) history.push("/");
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_URL,
            handleCodeInApp: true,
        };

        await auth.sendSignInLinkToEmail(email, config);

        toast.success(
            `Email is sent to ${email}. Click the link to complete your registration.`
        );

        // save user email in local storage
        window.localStorage.setItem("emailForRegistration", email);
        // clear state
        setEmail("");
    };

    const registerForm = () => (

    <Form onSubmit={handleSubmit} className="register-form">
        <Input
            placeholder="Enter Your Email..."
            type="email"
            className='login-placeholder'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            style={{backgroundColor: 'hsla(0, 0%,100%,.25)',color: '#fff',borderRadius: '2rem', border: 'none', fontSize: '15px', padding: '25px',}} />

        <Button
            type="submit"
            block className="btn-round" style={{padding: '12px'}} color="default">
            Sign Up
        </Button>
    </Form>
    );



    // video - header 4
    const [videoPlaying, setVideoPlaying] = React.useState(false);
    const videoRef = React.createRef();
    const videoButtonClick = () => {
        if (videoPlaying) {
            setVideoPlaying(false);
            videoRef.current.pause();
        } else {
            setVideoPlaying(true);
            videoRef.current.play();
        }
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
            <div className="section section-header cd-section" style={{paddingTop: '0',paddingBottom: '0', minHeight: '100vh'}} id="headers">


                {/* ********* HEADER 3 ********* */}
                <div className="header-3">


                    <div className="page-header header-video">
                        <div className="filter filter-danger" />
                        {/* We show the video image placeholder instead of the video for small devices */}
                        <div
                            className="video-image"
                            style={{
                                backgroundImage:
                                    "url(" + require("assets/img/video-placeholder.png") + ")",
                            }}
                        />
                        <video
                            id="video-source"
                            loop="loop"
                            muted="muted"
                            preload="auto"
                            volume="0"
                            ref={videoRef}
                            autoPlay
                            style={{width: 'auto'}}
                            playsInline
                        >
                            <source
                                src={require("assets/video/olivia-header.mp4")}
                                type="video/mp4"
                            ></source>
                            Video not supported
                        </video>
                        <div className="filter" />
                        <Container>


                        <Row>

                            <Col className="mr-auto" lg="12" md="12" sm="12" xs="12">
                                <Card className="card-register" style={{margin: '0 auto', backgroundColor: 'transparent'}}>
                                    <div style={{ margin: '0 auto'}}>
                                        <img src={require("assets/img/ecommerce/olivia-wilson-logo-light.png")} width='200px'  alt=""/>
                                    </div>
                                    <CardTitle className="text-center" tag="h3" style={{color: '#fff'}}>
                                        Sign Up
                                    </CardTitle>

                                    <div className="division"></div>


                                    {registerForm()}




                                        <Button block className="btn-round" style={{padding: '12px'}} color="google">
                                            <i className="fa fa-google" /> Sign Up with Google
                                        </Button>

                                    <div className="login">
                                        <p style={{color: '#fff', fontSize: '15px', fontWeight: '600'}}>
                                            Already have an account?{" "}
                                            <Link to="/login"
                                                  style={{ fontSize: '15px', fontWeight: '600'}}
                                            >
                                                Sign In
                                            </Link>
                                            .
                                        </p>
                                    </div>
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
                {/* ********* END HEADER 3 ********* */}


                {/*/!* ********* HEADER 4 (w/ video) ********* *!/*/}

            </div>
        </>
    );
}

export default Register;
