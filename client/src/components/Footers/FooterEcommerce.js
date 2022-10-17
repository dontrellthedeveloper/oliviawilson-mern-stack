import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";


const FooterEcommerce = () => {
  return (
    <>
      <footer className="footer footer-big">
        <Container>
          <Row>
            <Col md="6" sm="9">
              <div className="links">
                <ul className="uppercase-links">
                  <li className="mr-1">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Home
                    </a>
                  </li>
                  <li className="mr-1">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Company
                    </a>
                  </li>
                  <li className="mr-1">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Portfolio
                    </a>
                  </li>
                  <li className="mr-1">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Team
                    </a>
                  </li>
                  <li className="mr-1">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Contact
                    </a>
                  </li>
                </ul>
                <hr />
                <div className="copyright">
                  © {new Date().getFullYear()}, made with{" "}
                  <i className="fa fa-heart heart" /> by Creative Tim
                </div>
              </div>
            </Col>
            <Col className="ml-auto" md="4" sm="2">
              <div className="social-area">
                <Button
                  className="btn-round btn-just-icon mr-1"
                  color="facebook"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fa fa-facebook" />
                </Button>
                <Button
                  className="btn-just-icon btn-round mr-1"
                  color="twitter"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fa fa-twitter" />
                </Button>
                <Button
                  className="btn-just-icon btn-round mr-1"
                  color="google"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fa fa-google-plus" />
                </Button>
                <Button
                  className="btn-just-icon btn-round"
                  color="pinterest"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fa fa-pinterest-p" />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default FooterEcommerce;
