import React, { useState, useEffect } from "react";
import Slider from "nouislider";
import {
    getProductsByCount,
    fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import Star from "../components/forms/Star";
import {
    Card,
    CardHeader,
    CardBody,
    Collapse,
    Label,
    FormGroup,
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";
import FooterEcommerce from "components/Footers/FooterEcommerce.js";
import WhiteNavbar2 from "../components/nav/WhiteNavbar";
import ProductCard from "../components/cards/ProductCard";
import FooterBlack from "../components/Footers/FooterBlack";

const Shop = () => {
    // states for collapses
    const [priceRange, setPriceRange] = React.useState(true);
    const [clothing, setClothing] = React.useState(true);
    const [designer, setDesigner] = React.useState(true);
    // const [color, setColor] = React.useState(true);


    // states for filtering
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [star, setStar] = useState("");
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState("");
    const [brands, setBrands] = useState([
        "Apple",
        "Samsung",
        "Microsoft",
        "Lenovo",
        "ASUS",
    ]);
    const [brand, setBrand] = useState("");
    const [colors, setColors] = useState([
        "Black",
        "Brown",
        "Silver",
        "White",
        "Blue",
    ]);
    const [color, setColor] = useState("");
    const [shipping, setShipping] = useState("");

    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
        // fetch categories
        getCategories().then((res) => setCategories(res.data));
        // fetch subcategories
        getSubs().then((res) => setSubs(res.data));
    }, []);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setProducts(res.data);
        });
    };

    // 1. load products by default on page load
    const loadAllProducts = () => {
        getProductsByCount(12).then((p) => {
            setProducts(p.data);
            setLoading(false);
        });
    };

    // 2. load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
            if (!text) {
                loadAllProducts();
            }
        }, 300);
        return () => clearTimeout(delayed);
    }, [text]);

    // 3. load products based on price range
    useEffect(() => {
        console.log("ok to request");
        fetchProducts({ price });
    }, [ok]);

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });

        // reset
        setCategoryIds([]);
        setPrice(value);
        setStar("");
        setSub("");
        setBrand("");
        setColor("");
        setShipping("");
        setTimeout(() => {
            setOk(!ok);
        }, 300);
    };

    // 4. load products based on category
    // show categories in a list of checkbox
    const showCategories = () =>
        categories.map((c) => (
            <FormGroup check key={c._id}>
                <Label check>
                    <Input
                        defaultValue=""
                        type="checkbox"
                        onChange={handleCheck}
                        value={c._id}
                        checked={categoryIds.includes(c._id)}
                    />
                    {c.name} <span className="form-check-sign" />
                </Label>
            </FormGroup>
        ));

    // handle check for categories
    const handleCheck = (e) => {
        // reset
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setStar("");
        setSub("");
        setBrand("");
        setColor("");
        setShipping("");
        // console.log(e.target.value);
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // index or -1

        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            // if found pull out one item from index
            inTheState.splice(foundInTheState, 1);
        }

        setCategoryIds(inTheState);
        // console.log(inTheState);
        fetchProducts({ category: inTheState });
    };

    // 5. show products by star rating
    const handleStarClick = (num) => {
        // console.log(num);
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar(num);
        setSub("");
        setBrand("");
        setColor("");
        setShipping("");
        fetchProducts({ stars: num });
    };

    const showStars = () => (
        <div className="pr-4 pl-4 pb-2">
            <Star starClick={handleStarClick} numberOfStars={5} />
            <Star starClick={handleStarClick} numberOfStars={4} />
            <Star starClick={handleStarClick} numberOfStars={3} />
            <Star starClick={handleStarClick} numberOfStars={2} />
            <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
    );

    // 6. show products by sub category
    const showSubs = () =>
        subs.map((s) => (
            <div
                key={s._id}
                onClick={() => handleSub(s)}
                className="p-1 m-1 badge badge-secondary"
                style={{ cursor: "pointer" }}
            >
                {s.name}
            </div>
        ));

    const handleSub = (sub) => {
        // console.log("SUB", sub);
        setSub(sub);
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar("");
        setBrand("");
        setColor("");
        setShipping("");
        fetchProducts({ sub });
    };

    // 7. show products based on brand name
    const showBrands = () =>
        brands.map((b) => (
            <FormGroup check key={b}>
                <Label check>
                    <Input
                        defaultValue=""
                        type="checkbox"
                        onChange={handleBrand}
                        value={b}
                        checked={b === brand}
                    />
                    {b} <span className="form-check-sign" />
                </Label>
            </FormGroup>
        ));

    const handleBrand = (e) => {
        setSub("");
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar("");
        setColor("");
        setBrand(e.target.value);
        setShipping("");
        fetchProducts({ brand: e.target.value });
    };

    // 8. show products based on color
    const showColors = () =>
        colors.map((c) => (
            <FormGroup check key={c}>
                <Label check>
                    <Input
                        defaultValue=""
                        type="checkbox"
                        onChange={handleColor}
                        value={c}
                        checked={c === brand}
                    />
                    {c} <span className="form-check-sign" />
                </Label>
            </FormGroup>
        ));

    const handleColor = (e) => {
        setSub("");
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar("");
        setBrand("");
        setColor(e.target.value);
        setShipping("");
        fetchProducts({ color: e.target.value });
    };

    // 9. show products based on shipping yes/no
    const showShipping = () => (
        <>


            <FormGroup check>
                <Label check>
                    <Input
                        type="checkbox"
                        onChange={handleShippingchange}
                        value="Yes"
                        checked={shipping === "Yes"}
                    />
                    Yes <span className="form-check-sign" />
                </Label>
            </FormGroup>



            <FormGroup check>
                <Label check>
                    <Input
                        type="checkbox"
                        onChange={handleShippingchange}
                        value="No"
                        checked={shipping === "No"}
                    />
                    No <span className="form-check-sign" />
                </Label>
            </FormGroup>

        </>
    );

    const handleShippingchange = (e) => {
        setSub("");
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar("");
        setBrand("");
        setColor("");
        setShipping(e.target.value);
        fetchProducts({ shipping: e.target.value });
    };



    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        if (
            !document.getElementById("sliderDouble").classList.contains("noUi-target")
        ) {
            Slider.create(document.getElementById("sliderDouble"), {
                start: [20, 80],
                connect: [false, true, false],
                step: 1,
                range: { min: 0, max: 100 },
            });
        }
    });





    return (
        <>
            <WhiteNavbar2 />
            <div className="wrapper">

                {/* section */}
                <div className="section section-gray" style={{minHeight: '100vh'}}>
                    <Container>

                        <h3
                            style={{textAlign: 'center', marginTop: '60px', textTransform: 'capitalize'}}
                            className="section-title">
                            All Products
                        </h3>

                        {/*<h3 className="section-title">Find what you need</h3>*/}
                        <Row>
                            <Col md="3">
                                <Card className="card-refine" style={{marginTop: '70px'}}>
                                    <div
                                        aria-expanded={true}
                                        aria-multiselectable={true}
                                        className="panel-group"
                                        id="accordion"
                                    >
                                        <CardHeader
                                            className="card-collapse"
                                            id="priceRanger"
                                            role="tab"
                                        >
                                            <h5 className="mb-0 panel-title">
                                                <a
                                                    aria-expanded={priceRange}
                                                    href="#pablo"
                                                    // onClick={(e) => {
                                                    //     e.preventDefault();
                                                    //     setPriceRange(!priceRange);
                                                    // }}
                                                >
                                                    Price Range <i className="nc-icon nc-minimal-down" />
                                                </a>
                                            </h5>
                                        </CardHeader>
                                        <Collapse isOpen={priceRange}>
                                            <CardBody>

                                                {/*<Slider*/}
                                                {/*    className="ml-4 mr-4"*/}
                                                {/*    tootipFormatter={(v) => `$${v}`}*/}
                                                {/*    range*/}
                                                {/*    value={price}*/}
                                                {/*    onChange={handleSlider}*/}
                                                {/*    max="4999"*/}
                                                {/*/>*/}

                                                <div className="slider slider-info" id="sliderDouble" />
                                            </CardBody>
                                        </Collapse>
                                        <CardHeader
                                            className="card-collapse"
                                            id="clothingGear"
                                            role="tab"
                                        >
                                            <h5 className="mb-0 panel-title">
                                                <a
                                                    aria-expanded={clothing}
                                                    href="#pablo"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setClothing(!clothing);
                                                    }}
                                                >
                                                    Categories <i className="nc-icon nc-minimal-down" />
                                                </a>
                                            </h5>
                                        </CardHeader>
                                        <Collapse isOpen={clothing}>
                                            <CardBody>

                                                <div style={{ maringTop: "-10px" }}>{showCategories()}</div>


                                            </CardBody>
                                        </Collapse>
                                        <CardHeader
                                            className="card-collapse"
                                            id="designer"
                                            role="tab"
                                        >
                                            <h5 className="mb-0 panel-title">
                                                <a
                                                    aria-expanded={designer}
                                                    href="#pablo"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setDesigner(!designer);
                                                    }}
                                                >
                                                    Rating <i className="nc-icon nc-minimal-down" />
                                                </a>
                                            </h5>
                                        </CardHeader>
                                        <Collapse isOpen={designer}>
                                            <CardBody>

                                                <div style={{ maringTop: "-10px" }}>{showStars()}</div>


                                            </CardBody>
                                        </Collapse>
                                        <CardHeader className="card-collapse" id="color" role="tab">
                                            <h5 className="mb-0 panel-title">
                                                <a
                                                    aria-expanded={clothing}
                                                    href="#pablo"
                                                    // onClick={(e) => {
                                                    //     e.preventDefault();
                                                    //     setColor(!clothing);
                                                    // }}
                                                >
                                                    Sub Categories <i className="nc-icon nc-minimal-down" />
                                                </a>
                                            </h5>
                                        </CardHeader>
                                        <Collapse isOpen={clothing}>
                                            <CardBody>

                                                {showSubs()}

                                            </CardBody>
                                        </Collapse>


                                        <CardHeader className="card-collapse" id="color" role="tab">
                                            <h5 className="mb-0 panel-title">
                                                <a
                                                    aria-expanded={clothing}
                                                    href="#pablo"
                                                    // onClick={(e) => {
                                                    //     e.preventDefault();
                                                    //     setColor(!color);
                                                    // }}
                                                >
                                                    Brands <i className="nc-icon nc-minimal-down" />
                                                </a>
                                            </h5>
                                        </CardHeader>
                                        <Collapse isOpen={clothing}>
                                            <CardBody>

                                                <div style={{ maringTop: "-10px" }} className="pr-5">
                                                    {showBrands()}
                                                </div>


                                            </CardBody>
                                        </Collapse>
                                        <CardHeader className="card-collapse" id="color" role="tab">
                                            <h5 className="mb-0 panel-title">
                                                <a
                                                    aria-expanded={clothing}
                                                    href="#pablo"
                                                    // onClick={(e) => {
                                                    //     e.preventDefault();
                                                    //     setColor(!color);
                                                    // }}
                                                >
                                                    Colors <i className="nc-icon nc-minimal-down" />
                                                </a>
                                            </h5>
                                        </CardHeader>
                                        <Collapse isOpen={clothing}>
                                            <CardBody>

                                                {showColors()}


                                            </CardBody>
                                        </Collapse>
                                        <CardHeader className="card-collapse" id="color" role="tab">
                                            <h5 className="mb-0 panel-title">
                                                <a
                                                    aria-expanded={clothing}
                                                    href="#pablo"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setColor(!clothing);
                                                    }}
                                                >
                                                    Shipping <i className="nc-icon nc-minimal-down" />
                                                </a>
                                            </h5>
                                        </CardHeader>
                                        <Collapse isOpen={clothing}>
                                            <CardBody>

                                                {showShipping()}


                                            </CardBody>
                                        </Collapse>
                                    </div>
                                </Card>
                                {/* end card */}
                            </Col>



                            <Col md="9" >
                                <div className="products" style={{marginTop: '70px'}}>

                                    {products.length < 1 && <p>No products found</p>}

                                    <Row>
                                        {products.map((p) => (

                                                <Col key={p._id} md="4" sm="4">
                                                     <ProductCard product={p} />
                                                </Col>

                                        ))}


                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* section */}

                {/* section */}
                <FooterBlack />
            </div>
        </>
    );
}

export default Shop;
