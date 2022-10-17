import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import {Card, CardBody, CardTitle, Col, Row} from "reactstrap";


const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategories().then((c) => {
            setCategories(c.data);
            setLoading(false);
        });
    }, []);

    const showCategories = () =>
        categories.map((c) => (

            <Col md="4" sm="6" key={c._id}>
                <div className="card-big-shadow">
                    <Link to={`/category/${c.slug}`}>
                    <Card
                        className="card-just-text"
                        data-color="blue"
                        data-radius="none"
                        style={{background: '#252422'}}
                    >
                        <CardBody>
                            <h6 className="card-category">Category</h6>
                            <CardTitle tag="h4">
                                <Link to={`/category/${c.slug}`}>
                                    {c.name}
                                </Link>
                            </CardTitle>
                        </CardBody>
                    </Card>
                    {/* end card */}
                    </Link>
                </div>
            </Col>


        ));

    return (
        <div className="container">
            <Row className="coloured-cards justify-content-center">
                {loading ? (
                    <h4 className="text-center">Loading...</h4>
                ) : (
                    showCategories()
                )}
            </Row>
        </div>






    );
};

export default CategoryList;