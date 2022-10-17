import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import {Form, Input} from "reactstrap";

const Search = () => {
    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    const history = useHistory();

    const handleChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/shop?${text}`);
    };

    return (

        <Form className="form-inline ml-auto" onSubmit={handleSubmit}>
            <Input
                onChange={handleChange}
                className="mr-sm-2 no-border search-placeholder"
                placeholder="Search"
                type="search"
                value={text}
            />
            <SearchOutlined onClick={handleSubmit} style={{ visibility: 'hidden' }} />
        </Form>
    );
};

export default Search;