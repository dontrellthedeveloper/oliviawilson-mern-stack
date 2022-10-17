import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { updateSub, getSub } from "../../../functions/sub";
import CategoryForm from "../../../components/forms/CategoryForm";
import {
    FormGroup,
    Container,
    Row,
    Col,
} from "reactstrap";
import FooterEcommerce from "components/Footers/FooterEcommerce.js";
import WhiteNavbar2 from "../../../components/nav/WhiteNavbar";
import AdminNav from "../../../components/nav/AdminNav";
import FooterBlack from "../../../components/Footers/FooterBlack";



const SubUpdate = ({ match, history }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState("");

    useEffect(() => {
        loadCategories();
        loadSub();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSub = () =>
        getSub(match.params.slug).then((s) => {
            setName(s.data.name);
            setParent(s.data.parent);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        updateSub(match.params.slug, { name, parent }, user.token)
            .then((res) => {
                // console.log(res)
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is updated`);
                history.push("/admin/sub");
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
                            Sub Categories
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
                                    <small>Update Sub Category</small>
                                </h4>
                                )}

                                <FormGroup
                                    style={{backgroundColor: '#fff', fontSize: '16px'}}
                                >
                                    <select
                                        name="category"
                                        className="form-control"
                                        onChange={(e) => setParent(e.target.value)}
                                    >
                                        <option>Please select</option>
                                        {categories.length > 0 &&
                                            categories.map((c) => (
                                                <option key={c._id} value={c._id} selected={c._id === parent}>
                                                    {c.name}
                                                </option>
                                            ))}
                                    </select>

                                </FormGroup>


                                <CategoryForm
                                    handleSubmit={handleSubmit}
                                    name={name}
                                    setName={setName}
                                />


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

export default SubUpdate;
