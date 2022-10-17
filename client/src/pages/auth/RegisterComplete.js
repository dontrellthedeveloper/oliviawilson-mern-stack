import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";
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

const RegisterComplete = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
    }, [history]);


    let dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        if (!email || !password) {
            toast.error("Email and password is required");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
            );
            console.log("RESULT", result);
            if (result.user.emailVerified) {
                // remove user email fom local storage
                window.localStorage.removeItem("emailForRegistration");
                // get user id token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                // redux store
                console.log("user", user, "idTokenResult", idTokenResult);
                createOrUpdateUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id
                            },
                        });
                    })
                    .catch(err => console.log(err));
                // redirect
                history.push("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const completeRegistrationForm = () => (
        // <form onSubmit={handleSubmit}>
        //     <input type="email" className="form-control" value={email} disabled />
        //
        //     <input
        //         type="password"
        //         className="form-control"
        //         value={password}
        //         onChange={(e) => setPassword(e.target.value)}
        //         placeholder="Password"
        //         autoFocus
        //     />
        //     <br />
        //     <button type="submit" className="btn btn-raised">
        //         Complete Registration
        //     </button>
        // </form>



        <Form className="register-form" onSubmit={handleSubmit}>
            <Input
                value={email} disabled
                placeholder="Email..."
                type="email"
                className='login-placeholder'
                style={{backgroundColor: 'hsla(0, 0%,100%,.25)',color: '#fff',borderRadius: '2rem', border: 'none', fontSize: '15px', padding: '25px',}}
            />
            <Input
                placeholder="Password..."
                type="password"
                className='login-placeholder'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                style={{backgroundColor: 'hsla(0, 0%,100%,.25)',color: '#fff',borderRadius: '2rem', border: 'none', fontSize: '15px', padding: '25px'}}
            />


            <Button block type='submit' className="btn-round" style={{padding: '12px'}} color="default">
                Sign Up
            </Button>
        </Form>
    );










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
                                    <CardTitle className="text-center" tag="h3" style={{color: '#fff'}}>
                                        Complete Registration
                                    </CardTitle>


                                    <div className="division">
                                        {/*<div className="line l" />*/}
                                        {/*<span>or</span>*/}
                                        {/*<div className="line r" />*/}
                                    </div>

                                    {completeRegistrationForm()}

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

export default RegisterComplete;
