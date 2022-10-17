import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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


const Login = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));


    useEffect(() => {
        let intended = history.location.state;
        if (intended) {
            return;
        } else {
            if (user && user.token) history.push("/");
        }
    }, [user, history]);

    let dispatch = useDispatch();

    const roleBasedRedirect = (res) => {
        // check if intended
        let intended = history.location.state;
        if (intended) {
            history.push(intended.from);
        } else {
            if (res.data.role === "admin") {
                history.push("/admin/dashboard");
            } else {
                history.push("/user/history");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            // console.log(result);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

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
                    roleBasedRedirect(res)
                })
                .catch(err => console.log(err));

        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        auth
            .signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();
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
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    };

    const loginForm = () => (
    <Form className="register-form" onSubmit={handleSubmit}>
        <Input
            placeholder="Email..."
            type="email"
            className='login-placeholder'
            style={{backgroundColor: 'hsla(0, 0%,100%,.25)',color: '#fff',borderRadius: '2rem', border: 'none', fontSize: '15px', padding: '25px',}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
        />
        <Input
            placeholder="Password..."
            type="password"
            className='login-placeholder'
            style={{backgroundColor: 'hsla(0, 0%,100%,.25)',color: '#fff',borderRadius: '2rem', border: 'none', fontSize: '15px', padding: '25px'}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <Button
            block
            className="btn-round"
            style={{padding: '12px'}}
            color="default"
            onClick={handleSubmit}
        >
            Login
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
    })


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
                                            Log In
                                        </CardTitle>
                                    ) : (
                                        <CardTitle className="text-center" tag="h3" style={{color: '#fff'}}>
                                            Log In
                                        </CardTitle>
                                    )}

                                    <div className="division">

                                    </div>


                                    {loginForm()}


                                        <Button
                                            block
                                            className="btn-round"
                                            style={{padding: '12px'}}
                                            color="google"
                                            onClick={googleLogin}
                                        >
                                            <i className="fa fa-google" /> Login with Google
                                        </Button>



                                    <div className="login">
                                        <p style={{color: '#fff', fontSize: '15px', fontWeight: '600'}}>
                                            Dont have an account?{" "}
                                            <Link to="/register"
                                                  style={{ fontSize: '15px', fontWeight: '600'}}
                                            >
                                                Sign Up
                                            </Link>
                                            .
                                        </p>
                                    </div>

                                    <div className="login">
                                        <p style={{color: '#fff', fontSize: '15px', fontWeight: '600'}}>
                                            {" "}
                                            <Link to="/forgot/password"
                                                  style={{ fontSize: '15px', fontWeight: '600'}}
                                            >
                                                Forgot Your Password?
                                            </Link>
                                            .
                                        </p>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <div className="demo-footer text-center">
                        <h6>
                            © {new Date().getFullYear()}, made with{" "}
                        </h6>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
