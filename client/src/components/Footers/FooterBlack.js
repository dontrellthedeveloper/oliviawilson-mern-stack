/*eslint-disable*/
import React from "react";
import {Container, DropdownItem, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";


const FooterBlack = () => {

  let { user, cart } = useSelector((state) => ({ ...state }));

  return (
    <>
      <footer className="footer footer-black footer-white">
        <Container>
          <Row>
            <nav className="footer-nav">
              <ul>
                <li style={{marginBottom: '0', marginTop:'0'}}>
                  <Link to='/'>
                    <img src={require("assets/img/ecommerce/olivia-wilson-logo-light.png")} width='100px' alt=""/>
                  </Link>
                </li>
                <li>
                  <Link
                      className='footer-black__nav-links'
                      to='/shop'>
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                      className='footer-black__nav-links'
                      to='/cart'>
                    Cart
                  </Link>
                </li>
                {!user && (
                <li>
                  <Link
                      className='footer-black__nav-links'
                      to='/login'>
                    Login
                  </Link>
                </li>
                )}

                {!user && (
                    <li>
                      <Link
                          className='footer-black__nav-links'
                          to='/register'>
                        Sign Up
                      </Link>
                    </li>
                )}

                {user && user.role === "subscriber" && (
                    <li>
                      <Link
                          className='footer-black__nav-links'
                          to='/user/history'>
                        {user.email && user.email.split("@")[0]}
                      </Link>
                    </li>
                )}


                {user && user.role === "admin" && (
                    <li>
                      <Link
                          className='footer-black__nav-links'
                          to='/user/wishlist'>
                        {user.email && user.email.split("@")[0]}
                      </Link>
                    </li>
                )}

              </ul>
            </nav>
            <div className="credits ml-auto">
              <span className="copyright">
                © {new Date().getFullYear()}
                {" "}
                 | Olivia Wilson Boutique, LLC <i className="fa fa-heart heart" />
              </span>
            </div>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default FooterBlack;
