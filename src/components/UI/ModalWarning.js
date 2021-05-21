import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useStores } from "../../hooks/use-stores";

const ModalWarning = (props) => {
    //has this been shown already
    const { userStore } = useStores();
    const name = userStore.displayname;

    const toShow = !userStore.shownSDGWarning;

    if (userStore.shownSDGWarning == false) {
        console.log("shown: " + userStore.shownSDGWarning);
        userStore.shownSDGWarning = true;
    }

    const [show, setShow] = useState(toShow);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className="modalopened">
                        <div className="bulkuploadcss">
                            <div className="boxcont">
                                <p className="titleify"><div dangerouslySetInnerHTML={{ __html: props.message }} /></p>
                            </div>

                            <div className="buttonsbtn">
                                <div className="row">
                                    <div className="col-6 leftside"></div>
                                    <div className="col-6 rightside">
                                        <button
                                            class="modalinfobutton"
                                            variant="primary"
                                            onClick={handleClose}
                                        >
                                            {props.buttontext}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalWarning;
