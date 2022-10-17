import React, { useState, useEffect } from "react";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import FooterEcommerce from "components/Footers/FooterEcommerce.js";
import WhiteNavbar2 from "../../components/nav/WhiteNavbar";
import AdminNav from "../../components/nav/AdminNav";
import FooterBlack from "../../components/Footers/FooterBlack";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () =>
        getOrders(user.token).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
        });

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token).then((res) => {
            toast.success("Status updated");
            loadOrders();
        });
    };


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
                            Admin Dashboard
                        </h3>
                        <Row>
                            <Col md="3">

                                <AdminNav/>

                                {/* end card */}
                            </Col>


                            <Col md="9">
                                <h4 className="title" style={{marginBottom: '15px', textAlign: 'center', marginTop: '30px'}}>
                                    <small>Orders</small>
                                </h4>

                                <Orders orders={orders} handleStatusChange={handleStatusChange} />


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

export default AdminDashboard;
