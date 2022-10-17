import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";


const SectionPreFooterAreas = () => {
  return (
    <>
      {/*<div className="separator" />*/}
      <div className="social-line social-line-black">
        <Container>
          <Row>
            <Col md="4" sm="12">
              <h4 className="title">Follow Us</h4>
            </Col>
            <Col md="2" sm="3">
              <Button
                className="btn-neutral"
                color="link"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fa fa-twitter mr-1" />
                Twitter
              </Button>
            </Col>
            <Col md="2" sm="3">
              <Button
                className="btn-neutral"
                color="link"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fa fa-dribbble mr-1" />
                Dribbble
              </Button>
            </Col>
            <Col md="2" sm="3">
              <Button
                className="btn-neutral"
                color="link"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fa fa-youtube mr-1" />
                Youtube
              </Button>
            </Col>
            <Col md="2" sm="3">
              <Button
                className="btn-neutral"
                color="link"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fa fa-google-plus mr-1" />
                Google+
              </Button>
            </Col>
          </Row>
        </Container>
      </div>


    </>
  );
}

export default SectionPreFooterAreas;
