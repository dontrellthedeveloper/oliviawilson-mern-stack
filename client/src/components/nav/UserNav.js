import React from 'react';
import {Card, CardHeader} from "reactstrap";
import {Link} from "react-router-dom";

const UserNav = () => {
    return (
        <Card className="card-refine" style={{marginTop: '30px'}}>
            <div
                aria-expanded={true}
                aria-multiselectable={true}
                className="panel-group"
                id="accordion"
            >

                <CardHeader className="card-collapse" id="priceRanger" role="tab">
                    <h5 className="mb-0 panel-title">
                        <Link to='/user/history'
                        >
                            Purchase History

                        </Link>
                    </h5>
                </CardHeader>


                <CardHeader className="card-collapse" id="clothingGear" role="tab">
                    <h5 className="mb-0 panel-title">
                        <Link to='/user/wishlist'
                        >
                            Your Wishlist

                        </Link>
                    </h5>
                </CardHeader>


                <CardHeader className="card-collapse" id="designer" role="tab">
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

export default UserNav;
