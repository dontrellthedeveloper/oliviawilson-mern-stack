import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    createCategory,
    getCategories,
    removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
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
import FooterBlack from "../../../components/Footers/FooterBlack";



const CategoryCreate = () => {

    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);


    // step 1
    const [keyword, setKeyword] = useState("");



    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    useEffect(() => {
        loadCategories();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        createCategory({ name }, user.token)
            .then((res) => {
                // console.log(res)
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is created`);
                loadCategories()
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
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                    loadCategories();
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                    }
                });
        }
    };

    // step 3
    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };

    // step 4
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);



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
                                        <small>Create Category</small>
                                    </h4>
                                )}


                                <CategoryForm
                                    handleSubmit={handleSubmit}
                                    name={name}
                                    setName={setName}
                                />



                                <LocalSearch keyword={keyword} setKeyword={setKeyword} />



                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th className='pl-3'>Categories</th>
                                        <th className="text-center"></th>
                                        <th></th>
                                        <th></th>
                                        <th className="text-right"></th>
                                        <th className="text-right">Edit/Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>


                                    {categories.filter(searched(keyword)).map((c) => (

                                        <tr style={{backgroundColor: '#fff'}} key={c._id}>
                                            <td className='pl-3 font-weight-normal'>{c.name}</td>
                                            <td className="text-center"></td>

                                            <td></td>

                                            <td></td>
                                            <td className="text-right"></td>
                                            <td className="td-actions text-right">

                                                <Link to={`/admin/category/${c.slug}`}>
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
                                                    onClick={() => handleRemove(c.slug)}
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
                <FooterBlack />
            </div>
        </>
    );
}

export default CategoryCreate;
