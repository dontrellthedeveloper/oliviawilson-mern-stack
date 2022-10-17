import React, { useState, useEffect } from "react";
import { getUserOrders } from "../../functions/user";
import { useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col,
} from "reactstrap";
import FooterEcommerce from "components/Footers/FooterEcommerce.js";
import WhiteNavbar2 from "../../components/nav/WhiteNavbar";
import {Link} from "react-router-dom";
import UserNav from "../../components/nav/UserNav";
import FooterBlack from "../../components/Footers/FooterBlack";

const History = () => {

    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadUserOrders();
    }, []);

    const loadUserOrders = () =>
        getUserOrders(user.token).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
        });

    const showOrderInTable = (order) => (
        <table className="table table-bordered">
            <thead className="thead-light">
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Brand</th>
                <th scope="col">Color</th>
                <th scope="col">Count</th>
                <th scope="col">Shipping</th>
            </tr>
            </thead>

            <tbody>
            {order.products.map((p, i) => (
                <tr key={i}>
                    <td>
                        <b>{p.product.title}</b>
                    </td>
                    <td>{p.product.price}</td>
                    <td>{p.product.brand}</td>
                    <td>{p.color}</td>
                    <td>{p.count}</td>
                    <td>
                        {p.product.shipping === "Yes" ? (
                            <CheckCircleOutlined style={{ color: "green" }} />
                        ) : (
                            <CloseCircleOutlined style={{ color: "red" }} />
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );

    const showDownloadLink = (order) => (
        <PDFDownloadLink
            document={<Invoice order={order} />}
            fileName="invoice.pdf"
            className="btn btn-sm btn-block btn-outline-secondary text-secondary"
        >
            Download PDF
        </PDFDownloadLink>
    );

    const showEachOrders = () =>
        orders.map((order, i) => (
            <div key={i} className="m-5 p-3 card">
                <ShowPaymentInfo order={order} />
                {showOrderInTable(order)}
                <div className="row">
                    <div className="col">{showDownloadLink(order)}</div>
                </div>
            </div>
        ));


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
                            Purchase History
                        </h3>
                        <Row>
                            <Col md="3">
                                <UserNav/>
                            </Col>


                            <Col md="9">
                                <h4 className="title" style={{textAlign: 'center', marginTop: '30px'}}>
                                    <small>{orders.length > 0 ? "Your orders" : "No orders"}
                                    </small>
                                </h4>


                                {showEachOrders()}

                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* section */}
                <FooterBlack/>
            </div>
        </>
    );
}

export default History;
