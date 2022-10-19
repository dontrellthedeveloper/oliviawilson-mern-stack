import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import {
    Button,
    Card,
    CardHeader,
    FormGroup,
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";
import FooterEcommerce from "components/Footers/FooterEcommerce.js";
import WhiteNavbar2 from "../../components/nav/WhiteNavbar";
import {Link} from "react-router-dom";
import UserNav from "../../components/nav/UserNav";
import FooterBlack from "../../components/Footers/FooterBlack";

const Password = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(password);

        await auth.currentUser
            .updatePassword(password)
            .then(() => {
                setLoading(false);
                setPassword("");
                toast.success("Password updated");
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.message);
            });
    };

    const passwordUpdateForm = () => (

        <form
            className='admin-nav__mobile-form'
            onSubmit={handleSubmit}>
            <FormGroup>
                <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    type="text"
                    disabled={loading}
                    value={password}
                />
            </FormGroup>

            <div style={{textAlign: 'center'}}>

                <Button
                    disabled={!password || password.length < 6 || loading}
                    className="btn-round mr-1 mb-3"
                    color="default"
                    outline
                >
                    Save
                </Button>
            </div>
        </form>


    );




    document.documentElement.classList.remove("nav-open");



    return (
        <>

            <WhiteNavbar2 />
            <div className="wrapper">

                {/* section */}
                <div className="section section-gray" style={{minHeight: '100vh'}}>
                    <Container>
                        <h3
                            style={{textAlign: 'center',  textTransform: 'capitalize', marginTop: '40px'}}
                            className="section-title">
                            Change Password
                        </h3>
                        <Row>
                            <Col md="3">
                                <UserNav/>
                            </Col>


                            <Col md="7" style={{margin: '30px auto 0'}}>


                                {loading ? (
                                <h4 className="title">
                                    <small>Loading..</small>
                                </h4>
                                ) : (
                                <h4 className="title" style={{textAlign: 'center'}}>
                                    <small>Change Password</small>
                                </h4>
                                )}
                                {passwordUpdateForm()}

                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* section */}
                <FooterBlack />
            </div>
        </>
    );
}

export default Password;
