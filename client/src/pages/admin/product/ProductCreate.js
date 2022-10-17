import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import {
    Container,
    Row,
    Col,
} from "reactstrap";
import FooterEcommerce from "components/Footers/FooterEcommerce.js";
import WhiteNavbar2 from "../../../components/nav/WhiteNavbar";
import AdminNav from "../../../components/nav/AdminNav";
import FooterBlack from "../../../components/Footers/FooterBlack";



const initialState = {
    title: "Macbook Pro",
    description: "This is the best Apple product",
    price: "45000",
    categories: [],
    category: "",
    subs: [],
    shipping: "Yes",
    quantity: "50",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "White",
    brand: "Apple",
};



const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);



    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setValues({ ...values, categories: c.data }));

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then((res) => {
                console.log(res);
                window.alert(`"${res.data.title}" is created`);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                // if (err.response.status === 400) toast.error(err.response.data);
                toast.error(err.response.data.err);
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(e.target.name, " ----- ", e.target.value);
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("CLICKED CATEGORY", e.target.value);
        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value).then((res) => {
            console.log("SUB OPTIONS ON CATGORY CLICK", res);
            setSubOptions(res.data);
        });
        setShowSub(true);
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
                            Add Product
                        </h3>
                        <Row>
                            <Col md="3">
                                <AdminNav/>
                            </Col>


                            <Col md="7" sm="9" style={{margin: '0 auto'}}>



                                {loading ? (
                                    <h4 className="title" style={{textAlign: 'center', marginTop: '30px'}}>
                                        <small>Loading..</small>
                                    </h4>
                                ) : (
                                    <h4 className="title" style={{textAlign: 'center', marginTop: '30px'}}>
                                        <small>Add A Product</small>
                                    </h4>
                                )}


                                <div style={{textAlign: 'center'}}>


                                    <div style={{display: 'none'}}>
                                        {JSON.stringify(values.images)}
                                    </div>


                                </div>

                                <ProductCreateForm
                                    handleSubmit={handleSubmit}
                                    handleChange={handleChange}
                                    setValues={setValues}
                                    values={values}
                                    handleCategoryChange={handleCategoryChange}
                                    subOptions={subOptions}
                                    showSub={showSub}
                                    setLoading={setLoading}
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

export default ProductCreate;
