import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
    getCoupons,
    removeCoupon,
    createCoupon,
} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css";
import {
    Button,
    Container,
    Row,
    Col,
    UncontrolledTooltip, Table,
} from "reactstrap";
import FooterEcommerce from "components/Footers/FooterEcommerce.js";
import WhiteNavbar2 from "../../../components/nav/WhiteNavbar";
import AdminNav from "../../../components/nav/AdminNav";



const CreateCouponPage = () => {
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [discount, setDiscount] = useState("");
    const [loading, setLoading] = useState("");
    const [coupons, setCoupons] = useState([]);

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllCoupons();
    }, []);

    const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // console.table(name, expiry, discount);
        createCoupon({ name, expiry, discount }, user.token)
            .then((res) => {
                setLoading(false);
                loadAllCoupons(); // load all coupons
                setName("");
                setDiscount("");
                setExpiry("");
                toast.success(`"${res.data.name}" is created`);
            })
            .catch((err) => console.log("create coupon err", err));
    };

    const handleRemove = (couponId) => {
        if (window.confirm("Delete?")) {
            setLoading(true);
            removeCoupon(couponId, user.token)
                .then((res) => {
                    loadAllCoupons(); // load all coupons
                    setLoading(false);
                    toast.error(`Coupon "${res.data.name}" deleted`);
                })
                .catch((err) => console.log(err));
        }
    };



    document.documentElement.classList.remove("nav-open");

    return (
        <>
            <WhiteNavbar2 />
            <div className="wrapper">

                {/* section */}
                <div className="section section-gray">
                    <Container>
                        <h3 className="section-title">Coupons</h3>
                        <Row>
                            <Col md="3">
                                <AdminNav/>
                            </Col>


                            <Col md="7" style={{margin: '0 auto'}}>

                                {loading ? (
                                <h4 className="title">
                                    <small>Loading...</small>
                                </h4>
                                ) : (
                                <h4 className="title">
                                    <small>Create Coupon</small>
                                </h4>
                                )}





                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="text-muted">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            autoFocus
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="text-muted">Discount %</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => setDiscount(e.target.value)}
                                            value={discount}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="text-muted">Expiry</label>
                                        <br />
                                        <DatePicker
                                            className="form-control"
                                            selected={expiry}
                                            value={expiry}
                                            onChange={(date) => setExpiry(date)}
                                            required
                                        />
                                    </div>

                                    {/*<button className="btn btn-outline-dark btn-dark btn-round mr-1 mb-3">Save</button>*/}
                                    <div style={{textAlign: 'center'}}>

                                    <Button
                                        className="btn-round mr-1 mb-3"
                                        color="default"
                                        outline

                                    >
                                        Save
                                    </Button>
                                    </div>
                                </form>



                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th className='pl-3'>{coupons.length} Coupons</th>
                                        <th className="text-center"></th>
                                        <th>Expiration</th>
                                        {/*<th className="text-center"></th>*/}
                                        <th className="text-center">Discount</th>
                                        <th className="text-right"></th>
                                        <th className="text-center">Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {coupons.map((c) => (

                                    <tr style={{backgroundColor: '#fff'}} key={c._id}>

                                        <td className='pl-3 font-weight-normal'>{c.name}</td>
                                        <td></td>
                                        <td className='font-weight-normal'>{new Date(c.expiry).toLocaleDateString()}</td>
                                        <th className="text-center">{c.discount}%</th>
                                        <td className="text-right"></td>
                                        <td className="td-actions text-center">

                                            <Button
                                                className="btn-link"
                                                color="danger"
                                                data-toggle="tooltip"
                                                id="tooltip16493734"
                                                size="sm"
                                                type="button"
                                                style={{marginBottom: '0'}}
                                                onClick={() => handleRemove(c._id)}
                                            >
                                                <i className="fa fa-times" />
                                            </Button>
                                            <UncontrolledTooltip
                                                delay={0}
                                                placement="top"
                                                target="tooltip16493734"
                                            >
                                                Remove
                                            </UncontrolledTooltip>
                                        </td>
                                    </tr>

                                    ))}

                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* section */}
                <FooterEcommerce />
            </div>
        </>
    );
}

export default CreateCouponPage;
