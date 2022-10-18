import React from "react";
import { Link } from "react-router-dom";
import {Button, CardBody, CardTitle, Card} from "reactstrap";


const AdminProductCard = ({ product, handleRemove }) => {
    // destructure
    const { title, description, images, slug, price } = product;

    return (

        <Card className="card-product card-plain" style={{textAlign: 'center'}}>
            <div className="card-image">
                <div className='show-images_container'>


                    <Link to={`/product/${slug}`} className='show-img_img'>
                        <img
                            alt={images[0].public_id}
                            className="img-rounded img-responsive "
                            src={images && images.length ? images[0].url : 'laptop'}
                        />
                    </Link>


                </div>

                <div style={{textAlign: 'center', marginTop: '10px'}}>

                    <Link to={`/admin/product/${slug}`}>
                    <Button color="default" type="button" className="mr-1">
                        Edit
                        <i className="fa fa-edit" />
                    </Button>
                    </Link>

                    <Button
                        onClick={() => handleRemove(slug)}
                        color="danger" type="button" className="mr-1">
                        Delete
                        <i className="fa fa-times" />
                    </Button>
                </div>

                <CardBody>
                    <div className="card-description">
                        <CardTitle tag="h5">{title}</CardTitle>
                        <p className="card-description">
                            {/*{category} &amp; {sub}*/}
                        </p>
                    </div>
                    <div className="price">
                        <h5>$ {price}</h5>
                    </div>
                </CardBody>
            </div>
        </Card>
    );
};

export default AdminProductCard;