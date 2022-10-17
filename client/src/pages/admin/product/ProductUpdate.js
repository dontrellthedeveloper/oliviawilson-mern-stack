import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
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
    title: "",
    description: "",
    price: "",
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: "",
};



const ProductUpdate = ({ match, history }) => {
    // state
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);


    const { user } = useSelector((state) => ({ ...state }));
    // router
    const { slug } = match.params;

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);

    const loadProduct = () => {
        getProduct(slug).then((p) => {
            // console.log("single product", p);
            // 1 load single proudct
            setValues({ ...values, ...p.data });
            // 2 load single product category subs
            getCategorySubs(p.data.category._id).then((res) => {
                setSubOptions(res.data); // on first load, show default subs
            });
            // 3 prepare array of sub ids to show as default sub values in antd Select
            let arr = [];
            p.data.subs.map((s) => {
                arr.push(s._id);
            });
            console.log("ARR", arr);
            setArrayOfSubs((prev) => arr); // required for ant design select to work
        });
    };

    const loadCategories = () =>
        getCategories().then((c) => {
            console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
            setCategories(c.data);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        //
        setLoading(true);

        values.subs = arrayOfSubs;
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`"${res.data.title}" is updated`);
                history.push("/admin/products");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
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
        setValues({ ...values, subs: [] });

        setSelectedCategory(e.target.value);
        getCategorySubs(e.target.value).then((res) => {
            console.log("SUB OPTIONS ON CATGORY CLICK", res);
            setSubOptions(res.data);
        });

        console.log("EXISTING CATEGORY values.category", values.category);

        // if user clicks back to the original category
        // show its sub categories in default
        if (values.category._id === e.target.value) {
            loadProduct();
        }
        // clear old sub category ids
        setArrayOfSubs([]);
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
                            Update Product
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
                                        <small>Update Product</small>
                                    </h4>
                                )}

                                <ProductUpdateForm
                                    handleSubmit={handleSubmit}
                                    handleChange={handleChange}
                                    setValues={setValues}
                                    values={values}
                                    handleCategoryChange={handleCategoryChange}
                                    categories={categories}
                                    subOptions={subOptions}
                                    arrayOfSubs={arrayOfSubs}
                                    setArrayOfSubs={setArrayOfSubs}
                                    selectedCategory={selectedCategory}
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

export default ProductUpdate;
