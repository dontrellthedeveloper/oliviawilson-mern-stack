import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import {Link} from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import FooterEcommerce from "components/Footers/FooterEcommerce.js";
import WhiteNavbar2 from "../../../components/nav/WhiteNavbar";
import AdminNav from "../../../components/nav/AdminNav";
import FooterBlack from "../../../components/Footers/FooterBlack";


const CategoryUpdate = ({ history, match }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = () =>
        getCategory(match.params.slug).then((c) => setName(c.data.name));

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        updateCategory(match.params.slug, { name }, user.token)
            .then((res) => {
                // console.log(res)
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is updated`);
                history.push("/admin/category");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
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
                            Categories
                        </h3>
                        <Row>
                            <Col md="3">
                                <AdminNav/>
                            </Col>


                            <Col md="7" style={{margin: '0 auto'}}>
                                {loading ? (
                                    <h4 className="title" style={{textAlign: 'center', marginTop: '30px'}}>
                                        <small>Loading..</small>
                                    </h4>
                                ) : (
                                    <h4 className="title" style={{textAlign: 'center', marginTop: '30px'}}>
                                        <small>Update Category</small>
                                    </h4>
                                )}



                                <CategoryForm
                                    handleSubmit={handleSubmit}
                                    name={name}
                                    setName={setName}
                                />


                                <button className="btn btn-outline-primary"><Link to={`/admin/category`} >Cancel</Link></button>

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

export default CategoryUpdate;
