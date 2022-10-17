import React, { useState } from "react";
import { Modal, Tooltip } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
    Button,
} from "reactstrap";



const RatingModal = ({ children }) => {
    const [modalTip, setModalTip] = useState("Leave Rating");
    const [modalTip2, setModalTip2] = useState("Login to Leave Rating");


    const { user } = useSelector((state) => ({ ...state }));
    const [modalVisible, setModalVisible] = useState(false);

    let history = useHistory();
    let { slug } = useParams();

    const handleModal = () => {
        if (user && user.token) {
            setModalVisible(true);
        } else {
            history.push({
                pathname: "/login",
                state: { from: `/product/${slug}` },
            });
        }
    };

    return (
        <>
            {user ? (
            <Tooltip title={modalTip}>
            <Button
                onClick={handleModal}
                disabled={!user}
                className="btn-just-icon btn-border mr-1 mb-3"
                color="google"
                // style={{border: 'none'}}
            >
                <i className="fa fa-star" aria-hidden="true"></i>
            </Button>
            </Tooltip>
            ) : (
                <Tooltip title={modalTip2}>
                    <Button
                        className="btn-just-icon btn-border mr-1 mb-3"
                        color="google"
                        // style={{border: 'none'}}
                    >
                        <i className="fa fa-star" aria-hidden="true"></i>
                    </Button>
                </Tooltip>
            )}


            <Modal
                title="Leave your rating"
                centered
                visible={modalVisible}
                onOk={() => {
                    setModalVisible(false);
                    toast.success("Thanks for your review. It will apper soon");
                }}
                onCancel={() => setModalVisible(false)}
            >
                {children}
            </Modal>
        </>
    );
};

export default RatingModal;