import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";
import {Col} from "reactstrap";


const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadAllProducts();
    }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getProductsCount().then((res) => {
            console.log(res.data)
            setProductsCount(res.data)
        });

    }, []);



    const loadAllProducts = () => {
        setLoading(true);
        // sort, order, limit
        getProducts("sold", "desc", page).then((res) => {
            console.log(res.data)
            setProducts(res.data);
            setLoading(false);
        });
    };


    return (
        <>
            <>
                {loading ? (
                    <LoadingCard count={3} />
                ) : (
                    <>
                        {products.map((product) => (
                            <Col md="4" key={product._id} style={{minHeight: '600px'}}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </>
                )}
            </>

            <div className="row" style={{margin: '20px auto'}}>
                <nav className="col-md-4 offset-md-4 text-center pt-5 p-3" style={{display: 'contents'}}>
                    <Pagination
                        current={page}
                        total={Math.round((productsCount / 3) * 10)}
                        onChange={(value) => setPage(value)}
                    />
                </nav>
            </div>
        </>
    );
};

export default BestSellers;
