import React from "react";
import {FormGroup, Input} from "reactstrap";

const LocalSearch = ({ keyword, setKeyword }) => {
    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };

    return (
        <FormGroup>
            <Input
                // defaultValue=""
                placeholder="Filter"
                type="text"
                value={keyword}
                onChange={handleSearchChange}
            />
        </FormGroup>


    );
};

export default LocalSearch;