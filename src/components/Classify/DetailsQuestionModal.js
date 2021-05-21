// Render Prop
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useStores } from "../../hooks/use-stores";
import remove from "lodash/remove";
import Infobox from "../../components/UI/Infobox";

const DetailsQuestionModal = (props) => {
    const { fundStore } = useStores();

    const handleClose = () => {
        props.closemodal();
    };

    const handleSubmit = (values) => {
        //add to store
        remove(
            props.fund.questions,
            (a) => a.questionpath === props.questionpath
        );

        //structure object to be added to notations
        values[props.questionpath].forEach((item, index) => {
            //find answer data as formik is not returning it
            var q = props.questions.find((obj) => {
                return obj.id === item;
            });

            props.fund.questions.push({
                questionpath: props.questionpath,
                id: item,
                answer: q.answer,
                link: values[item + "_link"],
                score: values[item + "_score"],
                other: values[item + "_other"],
            });
        });

        //save to db
        let f = props.fund;
        delete f.__v;

        fundStore.saveFund(f).then((res) => handleClose());
    };

    //initalise from OrganisationStore
    let initv = {};

    if (props.fund.questions) {
        const oon = props.fund.questions.filter(
            (a) => a.questionpath === props.questionpath
        );

        initv[props.questionpath] = [];
        oon.forEach((n, i) => {
            //prepare checkboxes
            initv[props.questionpath].push(n.id);

            //prepare fields
            initv[n.id + "_answer"] = n.answer;
            initv[n.id + "_link"] = n.link;
            initv[n.id + "_score"] = n.score;
            initv[n.id + "_other"] = n.other;
        });
    } else {
        initv[props.questionpath] = [];
        props.questions.forEach((n, i) => {
            //prepare fields
            initv[n.id + "_answer"] = n.answer;
            initv[n.id + "_link"] = "";
            initv[n.id + "_score"] = "";
            initv[n.id + "_other"] = "";
        });
    }

    const styleBasedOnCheckbox = (cb) => {
        if (initv[props.questionpath].includes(cb)) {
            return {};
        } else {
            return { display: "none" };
        }
    };

    const showLinkScore = (name) => {
        const d = document.querySelector("#div" + name);

        if (d.hasAttribute("style")) {
            d.removeAttribute("style");
        } else {
            d.setAttribute("style", "display:none;");
        }
    };
    //display everything
    return (
        <div>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header />
                <Modal.Body>
                    <div className="modalopened">
                        <div className="bulkuploadcss">
                            <Formik
                                initialValues={initv}
                                onSubmit={(values) => {
                                    handleSubmit(values);
                                }}
                            >
                                {({ errors, touched, handleChange }) => (
                                    <Form>
                                        <a
                                            href="#"
                                            onClick={handleClose}
                                            className="cross"
                                        >
                                            <img
                                                src="/assets/img/closeicon.png"
                                                alt=""
                                            />
                                        </a>
                                        <div className="boxcont">
                                            <h1>
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: props.title,
                                                    }}
                                                />
                                            </h1>
                                            <p className="undertitle">
                                                Select all that apply from the
                                                list below. For some selections
                                                you will be asked to provide
                                                your score and a link to the
                                                source, if available.
                                            </p>

                                            {props.questions.map((q) => (
                                                <div
                                                    className="forscroll"
                                                    key={q.id}
                                                >
                                                    <div className="boxs lablechecked">
                                                        <label className="container-checkbox">
                                                            {q.answer}
                                                            <Field
                                                                name={
                                                                    props.questionpath
                                                                }
                                                                value={q.id}
                                                                type="checkbox"
                                                                onClick={() =>
                                                                    showLinkScore(
                                                                        q.id
                                                                    )
                                                                }
                                                            />

                                                            {q.infobox ? (
																<div style={{'display':'inline','padding-left':'10px'}}>
                                                                    <Infobox
                                                                        key="harm"
                                                                        title=""
                                                                        info={
                                                                            q.infobox
																		}
																		paddingleft
                                                                    /></div>
                                                            ) : null}

                                                            <span className="checkmark" />
                                                        </label>
                                                        <div
                                                            className="ifyesdiv"
                                                            id={"div" + q.id}
                                                            style={styleBasedOnCheckbox(
                                                                q.id
                                                            )}
                                                        >
                                                            {q.link ? (
                                                                <>
                                                                    <p className="pofinput">
                                                                        Provide
                                                                        link (if
                                                                        available)
                                                                    </p>
                                                                    <Field
                                                                        name={
                                                                            q.id +
                                                                            "_link"
                                                                        }
                                                                        type="text"
                                                                        maxlength="320"
                                                                        placeholder="http://"
                                                                    />{" "}
                                                                </>
                                                            ) : null}

                                                            {q.score ? (
                                                                <>
                                                                    <p className="pofinput">
                                                                        Rating
                                                                        or score
                                                                        (if
                                                                        available){" "}
                                                                        <Infobox
                                                                            id="org_identifier"
                                                                            title=""
                                                                            maxlength="320"
                                                                            info="Publicly display a score or rating provided by the above organisation."
                                                                        />
                                                                    </p>
                                                                    <Field
                                                                        name={
                                                                            q.id +
                                                                            "_score"
                                                                        }
                                                                        type="text"
                                                                        maxlength="320"
                                                                        className="withmxwidth"
                                                                    />{" "}
                                                                </>
                                                            ) : null}

                                                            {q.other ? (
                                                                <>
                                                                    <p className="pofinput">
                                                                        Please
                                                                        comment:
                                                                    </p>
                                                                    <Field
                                                                        name={
                                                                            q.id +
                                                                            "_other"
                                                                        }
                                                                        type="text"
                                                                        maxlength="320"
                                                                        placeholder=""
                                                                    />{" "}
                                                                </>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="buttonsbtn">
                                            <div className="row">
                                                <div className="col-6 leftside">
                                                    <button
                                                        data-dismiss="modal"
                                                        onClick={handleClose}
                                                    >
                                                        <span>Cancel</span>
                                                    </button>
                                                </div>
                                                <div className="col-6 rightside">
                                                    <button type="submit">
                                                        <span>
                                                            Save Changes
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer />
            </Modal>
        </div>
    );
};

export default DetailsQuestionModal;
