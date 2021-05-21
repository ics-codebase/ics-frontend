import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useStores } from "../../hooks/use-stores";

const ModalOk = (props) => {

    return (
        <>
            <Modal show={props.show} onHide={null}  backdrop="static" keyboard={false}>
                <Modal.Body>
                    <div className="modalopened">
                        <div className="bulkuploadcss">
                            <div className="boxcont">
                                <p className="titleify">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: props.message,
                                        }}
                                    />
                                </p>
                            </div>

                            <div className="buttonsbtn">
                                <div className="row">
                                    <div className="col-6 leftside">
                                        <button
                                            class="modalinfobutton"
                                            variant="secondary"
                                            onClick={props.handleCancel}
                                        >
                                            {props.buttontextcancel}
                                        </button>
                                    </div>
                                    <div className="col-6 rightside">
                                        <button
                                            class="modalinfobutton"
                                            variant="primary"
                                            onClick={props.handleOk}
                                        >
                                            {props.buttontextok}
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

export default ModalOk;
