import React from 'react';
import {Card, CardHeader} from "reactstrap";
import {Link} from "react-router-dom";

const AdminNav = () => {
    return (
        <Card className="card-refine" style={{marginTop: '70px'}}>
            <div
                aria-expanded={true}
                aria-multiselectable={true}
                className="panel-group"
                id="accordion"
            >

                <CardHeader className="card-collapse" id="priceRanger" role="tab">
                    <h5 className="mb-0 panel-title">
                        <Link to='/admin/dashboard'
                        >
                            Admin Dashboard
                        </Link>
                    </h5>
                </CardHeader>
                <CardHeader className="card-collapse" id="designer" role="tab">
                    <h5 className="mb-0 panel-title">
                        <Link to='/admin/products'
                        >
                            All Products
                        </Link>
                    </h5>
                </CardHeader>
                <CardHeader className="card-collapse" id="clothingGear" role="tab">
                    <h5 className="mb-0 panel-title">
                        <Link to='/admin/product'
                        >
                            Add Product
                        </Link>
                    </h5>
                </CardHeader>
                <CardHeader className="card-collapse" id="color" role="tab">
                    <h5 className="mb-0 panel-title">
                        <Link to='/admin/category'
                        >
                            Add Category
                        </Link>
                    </h5>
                </CardHeader>
                <CardHeader className="card-collapse" id="priceRanger" role="tab">
                    <h5 className="mb-0 panel-title">
                        <Link to='/admin/sub'
                        >
                            Add Sub Category
                        </Link>
                    </h5>
                </CardHeader>
                <CardHeader className="card-collapse" id="priceRanger" role="tab">
                    <h5 className="mb-0 panel-title">
                        <Link to='/admin/coupon'
                        >
                            Add Coupon
                        </Link>
                    </h5>
                </CardHeader>

                <CardHeader className="card-collapse" id="priceRanger" role="tab">
                    <h5 className="mb-0 panel-title">
                        <Link to='/user/password'
                        >
                            Change Password
                        </Link>
                    </h5>
                </CardHeader>
            </div>
        </Card>
    );
};

export default AdminNav;
