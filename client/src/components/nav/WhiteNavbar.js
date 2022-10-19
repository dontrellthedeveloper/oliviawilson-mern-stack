import React, {useEffect, useContext, useState} from "react";
import { Link } from "react-router-dom";
import Headroom from "../../../node_modules/headroom.js/dist/headroom";
import {
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Navbar,
    Nav,
    Container,
} from "reactstrap";
import { Menu, Badge } from "antd";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";


const WhiteNavbar = () => {
    const [bodyClick, setBodyClick] = React.useState(false);
    const [collapseOpen, setCollapseOpen] = React.useState(false);

    const [current, setCurrent] = useState("home");

    let dispatch = useDispatch();
    let { user, cart } = useSelector((state) => ({ ...state }));
    let history = useHistory();


    const handleClick = (e) => {
        // console.log(e.key);
        setCurrent(e.key);
    };


    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: 'LOGOUT',
            payload: null
        });
        history.push('/login');
    };

    // const { authState, setAuthState } = useContext(AuthContext);

    useEffect(() => {
        let headroom = new Headroom(document.getElementById("navbar-main"));
        // initialise
        headroom.init();
    });



    return (
        <>
            {bodyClick ? (
                <div
                    id="bodyClick"
                    onClick={() => {
                        document.documentElement.classList.toggle("nav-open");
                        setBodyClick(false);
                        setCollapseOpen(false);
                    }}
                />
            ) : null}
            <Navbar className="fixed-top" expand="lg" id="navbar-main">
                <Container>
                    <div className="navbar-translate">
                        <Link to='/'>
                            <img
                                className='homepage_nav-img'
                                src={require("assets/img/ecommerce/olivia-wilson-logo-light2.png")} width='100px' alt=""/>
                        </Link>



                        <button
                            className="navbar-toggler"
                            id="navigation"
                            type="button"
                            onClick={() => {
                                document.documentElement.classList.toggle("nav-open");
                                setBodyClick(true);
                                setCollapseOpen(true);
                            }}
                        >
                            <span className="navbar-toggler-bar bar1" />
                            <span className="navbar-toggler-bar bar2" />
                            <span className="navbar-toggler-bar bar3" />
                        </button>
                    </div>

                    <Collapse navbar isOpen={collapseOpen}>
                        <Nav className="ml-auto" navbar>


                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle className="mr-2" color="default" nav to="/shop" tag={Link}>
                                    Shop
                                </DropdownToggle>
                            </UncontrolledDropdown>

                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle className="mr-2" color="default" nav to="/cart" tag={Link}>
                                    <Badge count={cart.length} offset={[9, 0]}>
                                        <span style={{color: '#66615B'}}
                                              className='navbar__cart-mobile'
                                        >Cart</span>
                                    </Badge>
                                </DropdownToggle>
                            </UncontrolledDropdown>

                        {!user && (
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle className="mr-2" color="default" nav to="/login" tag={Link}>
                                    Login
                                </DropdownToggle>
                            </UncontrolledDropdown>
                        )}

                        {!user && (
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle className="mr-2" color="default" nav to="/register" tag={Link}>
                                    Sign Up
                                </DropdownToggle>
                            </UncontrolledDropdown>
                        )}




                        {user && (
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle className="mr-2" to={`/admin/dashboard`} color="default" caret nav>

                                    {user.email && user.email.split("@")[0]}
                                </DropdownToggle>

                                <DropdownMenu className="dropdown-danger" right>


                                    {user && user.role === "subscriber" && (
                                        <DropdownItem to={`/user/history`} tag={Link}>
                                            <i className="nc-icon nc-single-02" />
                                            User Dashboard
                                        </DropdownItem>

                                    )}

                                    {user && user.role === "admin" && (
                                        <DropdownItem to={`/admin/dashboard`} tag={Link}>
                                            <i className="nc-icon nc-single-02" />
                                            Admin Dashboard
                                        </DropdownItem>
                                    )}

                                    <DropdownItem to={`/user/wishlist`} tag={Link}>
                                        <i className="fa fa-heart" />
                                        Wishlist
                                    </DropdownItem>

                                    <DropdownItem onClick={logout}>
                                        <i className="fa fa-sign-out" />
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>

                            </UncontrolledDropdown>
                        )}

                            <Search />

                            {/*    </>*/}
                            {/*)}*/}

                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default WhiteNavbar;
