import React from "react";
import {Col, FormGroup, Row} from "reactstrap";


const ProductListItems = ({ product }) => {
    const {
        price,
        category,
        subs,
        shipping,
        color,
        brand,
        quantity,
        sold,
        description
    } = product;

    return (

        <>
            <h4 className="price">
                <strong>$ {price}</strong>
            </h4>


            <hr/>
            <Row>
                <Col md="6" sm="6">
                    <li className="list-group-item">
                        Brand: {" "}
                        <span className="label label-default label-pill pull-xs-right">
                          {brand}
                        </span>
                    </li>


                </Col>
                <Col md="6" sm="6">
                    <li className="list-group-item">
                        Color: {" "}
                        <span className="label label-default label-pill pull-xs-right">
                          {color}
                        </span>
                    </li>

                </Col>
            </Row>
            <hr />
        </>


    );
};

export default ProductListItems;