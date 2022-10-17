import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";
import {Card, CardBody, CardTitle, Col, Row} from "reactstrap";

const SubList = () => {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSubs().then((res) => {
            setSubs(res.data);
            setLoading(false);
        });
    }, []);

    const showSubs = () =>
        subs.map((s) => (

            <Col md="4" sm="6" key={s._id}>
                <div className="card-big-shadow">
                    <Link to={`/sub/${s.slug}`}>

                    <Card
                        className="card-just-text"
                        data-color="blue"
                        data-radius="none"
                        style={{background: '#252422'}}
                    >
                        <CardBody>
                            <h6 className="card-category">Category</h6>
                            <CardTitle tag="h4">
                                <Link to={`/sub/${s.slug}`}>
                                    {s.name}
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
                {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
            </Row>
        </div>
    );
};

export default SubList;