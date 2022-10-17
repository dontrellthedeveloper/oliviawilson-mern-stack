import React from "react";
import {Button, FormGroup, Input} from "reactstrap";


const CategoryForm = ({ handleSubmit, name, setName }) => (


    <form onSubmit={handleSubmit}>

        <FormGroup>
            <Input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
            />
        </FormGroup>

        <div style={{textAlign: 'center'}}>


            <Button
                className="btn-round mr-1 mb-3"
                color="default"
                outline
                type="submit"
            >
                Save
            </Button>
        </div>
    </form>

);

export default CategoryForm;