import React from "react";
import { Select } from "antd";
import {Button, Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from "reactstrap";
import FileUpload from "./FileUpload";

const { Option } = Select;

const ProductUpdateForm = ({
       handleSubmit,
       handleChange,
       setValues,
       values,
       handleCategoryChange,
       categories,
       subOptions,
       arrayOfSubs,
       setArrayOfSubs,
       selectedCategory,
        setLoading
     }) => {


    const {
        title,
        description,
        price,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand,
    } = values;


    return (
    <form onSubmit={handleSubmit}>
        <FormGroup>
            <h6>
                Title <span className="icon-danger">*</span>
            </h6>
            <Input
                className="border-input"
                placeholder="enter the product name here..."
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
            />
        </FormGroup>





        <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
        />


        <Row className="price-row">
            <Col md="12">
                <h6>
                    Category <span className="icon-danger">*</span>
                </h6>

                <FormGroup
                    style={{backgroundColor: '#fff', fontSize: '16px'}}
                >
                    <select
                        name="category"
                        className="form-control"
                        onChange={handleCategoryChange}
                        value={selectedCategory ? selectedCategory : category._id}
                    >
                        {categories.length > 0 &&
                            categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                    </select>
                </FormGroup>

            </Col>
                <Col md="12">
                    <h6>Sub Categories</h6>
                    <InputGroup className="border-input">
                        <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Please select"
                            value={arrayOfSubs}
                            onChange={(value) => setArrayOfSubs(value)}
                        >
                            {subOptions.length &&
                                subOptions.map((s) => (
                                    <Option key={s._id} value={s._id}>
                                        {s.name}
                                    </Option>
                                ))}
                        </Select>

                    </InputGroup>
                </Col>
        </Row>

        <Row className="price-row">
            <Col md="6">
                <h6>
                    Price <span className="icon-danger">*</span>
                </h6>
                <InputGroup className="border-input" style={{marginBottom: '1rem'}}>
                    <Input
                        className="border-input"
                        placeholder="update price"
                        type="number"
                        name="price"
                        value={price}
                        onChange={handleChange}
                    />
                    <InputGroupAddon addonType="append">
                        <InputGroupText>
                            <i className="fa fa-dollar" />
                        </InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </Col>
            <Col md="6">
                <h6>Quantity</h6>
                <InputGroup className="border-input">
                    <Input
                        className="border-input"
                        placeholder="enter quantity"
                        type="number"
                        name="quantity"
                        value={quantity}
                        onChange={handleChange}
                    />

                </InputGroup>
            </Col>
        </Row>




        <Row className="price-row">
            <Col md="4">
                <h6>
                    Shipping <span className="icon-danger">*</span>
                </h6>

                <FormGroup
                    style={{backgroundColor: '#fff', fontSize: '16px'}}
                >
                    <select
                        value={shipping === "Yes" ? "Yes" : "No"}
                        name="shipping"
                        className="form-control"
                        onChange={handleChange}
                    >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </FormGroup>

            </Col>

            <Col md="4">
                <h6>
                    Color <span className="icon-danger">*</span>
                </h6>

                <FormGroup
                    style={{backgroundColor: '#fff', fontSize: '16px'}}
                >
                    <select
                        value={color}
                        name="color" className="form-control" onChange={handleChange}>
                        {colors.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </FormGroup>

            </Col>

            <Col md="4">
                <h6>
                    Brand <span className="icon-danger">*</span>
                </h6>

                <FormGroup
                    style={{backgroundColor: '#fff', fontSize: '16px'}}
                >
                    <select
                        value={brand}
                        name="brand" className="form-control" onChange={handleChange}>
                        {brands.map((b) => (
                            <option key={b} value={b}>
                                {b}
                            </option>
                        ))}
                    </select>
                </FormGroup>

            </Col>

        </Row>



        <FormGroup>
            <h6>Description</h6>
            <Input
                className="textarea-limited"
                name="description"
                placeholder="update product description"
                rows="6"
                type="textarea"
                value={description}
                onChange={handleChange}
            />

        </FormGroup>

        <div style={{textAlign: 'center'}}>

            <Button
                className="btn-round mr-1 mb-3"
                color="default"
                outline
                type="submit"
            >
                Save Product
            </Button>
        </div>
    </form>



    );
};

export default ProductUpdateForm;