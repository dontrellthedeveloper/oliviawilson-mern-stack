import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub, removeSub, getSubs } from "../../../functions/sub";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import {
    Button,
    FormGroup,
    Container,
    Row,
    Col,
    UncontrolledTooltip, Table,
} from "reactstrap";
import FooterEcommerce from "components/Footers/FooterEcommerce.js";
import WhiteNavbar2 from "../../../components/nav/WhiteNavbar";
import AdminNav from "../../../components/nav/AdminNav";



const SubCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [subs, setSubs] = useState([]);
    // step 1
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSubs = () => getSubs().then((s) => setSubs(s.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                // console.log(res)
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is created`);
                loadSubs();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = async (slug) => {
        // let answer = window.confirm("Delete?");
        // console.log(answer, slug);
        if (window.confirm("Delete?")) {
            setLoading(true);
            removeSub(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                    loadSubs();
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                    }
                });
        }
    };

    // step 4
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);



    document.documentElement.classList.remove("nav-open");



    return (
        <>
            <WhiteNavbar2 />
            <div className="wrapper">

                {/* section */}
                <div className="section section-gray">
                    <Container>
                        <h3 className="section-title">Sub Categories</h3>
                        <Row>
                            <Col md="3">
                                <AdminNav/>
                            </Col>


                            <Col md="7" style={{margin: '0 auto'}}>

                                {loading ? (
                                    <h4 className="title">
                                        <small>Loading..</small>
                                    </h4>
                                ) : (
                                <h4 className="title">
                                    <small>Create Sub Category</small>
                                </h4>
                                )}



                                <FormGroup
                                    style={{backgroundColor: '#fff', fontSize: '16px'}}
                                >
                                    <select
                                        name="category"
                                        className="form-control"
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option>Please select</option>
                                        {categories.length > 0 &&
                                            categories.map((c) => (
                                                <option key={c._id} value={c._id}>
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

                                {/* step 2 and step 3 */}
                                <LocalSearch keyword={keyword} setKeyword={setKeyword} />



                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th className='pl-3'>Sub Categories</th>
                                        <th className="text-center"></th>
                                        <th></th>
                                        <th></th>
                                        <th className="text-right"></th>
                                        <th className="text-right">Edit/Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {subs.filter(searched(keyword)).map((s) => (
                                        <tr style={{backgroundColor: '#fff'}} key={s._id}>
                                            <td className='pl-3 font-weight-normal'>{s.name}</td>
                                            <td className="text-center"></td>

                                            <td></td>

                                            <td></td>
                                            <td className="text-right"></td>
                                            <td className="td-actions text-right">

                                                <Link to={`/admin/sub/${s.slug}`}>
                                                    <Button
                                                        className="btn-link mr-1"
                                                        color="success"
                                                        data-toggle="tooltip"
                                                        id="tooltip278266693"
                                                        size="sm"
                                                        type="button"
                                                        style={{marginBottom: '0'}}
                                                    >
                                                        <i className="fa fa-edit" />
                                                    </Button>
                                                </Link>
                                                <UncontrolledTooltip
                                                    delay={0}
                                                    placement="top"
                                                    target="tooltip278266693"
                                                >
                                                    Edit Profile
                                                </UncontrolledTooltip>
                                                <Button
                                                    className="btn-link"
                                                    color="danger"
                                                    data-toggle="tooltip"
                                                    id="tooltip16493734"
                                                    size="sm"
                                                    type="button"
                                                    style={{marginBottom: '0'}}
                                                    onClick={() => handleRemove(s.slug)}
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

export default SubCreate;
