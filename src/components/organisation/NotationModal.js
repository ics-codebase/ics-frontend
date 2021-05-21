// Render Prop
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useStores } from "../../hooks/use-stores";
import remove from "lodash/remove";
import Infobox from "../../components/UI/Infobox";

const NotationModal = (props) => {
    const { organisationStore } = useStores();

    //initalise from OrganisationStore
    const oon = organisationStore.organisation.notations.filter(
        (a) => a.group === props.notationgroup
    );

    let initv = {};
    initv[props.notationgroup] = [];
    let initv_cb = [];
    oon.forEach((n, i) => {
        //prepare checkboxes
        initv[props.notationgroup].push(n.name);

        //prepare fields
        initv[n.name + "_link"] = n.link;
        initv[n.name + "_score"] = n.score;
        initv[n.name + "_other"] = n.other;
    });

    //create input validation
    const InputSchema = Yup.object().shape({});

    const handleClose = () => {
        props.closemodal();
    };

    const handleSubmit = (values) => {
        //add to store
        remove(
            organisationStore.organisation.notations,
            (a) => a.group === props.notationgroup
        );

        //structure object to be added to notations
        values[props.notationgroup].forEach((item, index) => {
            organisationStore.organisation.notations.push({
                group: props.notationgroup,
                name: item,
                link: values[item + "_link"],
                score: values[item + "_score"],
                other: values[item + "_other"],
            });
        });

        organisationStore.saveCurrentOrganisation();

        //close
        handleClose();
    };

    function showLinkScore(name) {
        const d = document.querySelector("#" + name);

        if (d.hasAttribute("style")) {
            d.removeAttribute("style");
        } else {
            d.setAttribute("style", "display:none;");
        }
    }

    function makeName(n) {
        return n.replace(/ /g, "__");
    }

    function cleanName(n) {
        return n.replace(/__/g, " ");
    }

    function styleBasedOnCheckbox(cb) {
        if (initv[props.notationgroup].includes(cb)) {
            return {};
        } else {
            return { display: "none" };
        }
    }

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
                                            <h1>{props.title}</h1>
                                            <p className="undertitle">
                                                Select all that apply from the
                                                list below. For certain
                                                selections you will be asked to
                                                provide your score and a source
                                                if available.
                                            </p>

                                            {props.questions.map((q) => (
                                                <div
                                                    className="forscroll"
                                                    key={makeName(q.name)}
                                                >
                                                    <div className="boxs lablechecked">
                                                        <label className="container-checkbox">
                                                            {q.name}
                                                            <Field
                                                                name={
                                                                    props.notationgroup
                                                                }
                                                                value={makeName(
                                                                    q.name
                                                                )}
                                                                type="checkbox"
                                                                onClick={() =>
                                                                    showLinkScore(
                                                                        "div" +
                                                                            makeName(
                                                                                q.name
                                                                            )
                                                                    )
                                                                }
                                                            />
                                                            <span className="checkmark" />
                                                        </label>
                                                        <div
                                                            className="ifyesdiv"
                                                            id={
                                                                "div" +
                                                                makeName(q.name)
                                                            }
                                                            style={styleBasedOnCheckbox(
                                                                makeName(q.name)
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
                                                                            makeName(
                                                                                q.name
                                                                            ) +
                                                                            "_link"
                                                                        }
                                                                        type="text"
                                                                        placeholder="http://"
                                                                    />
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
                                                                            info="Publicly display a score or rating provided by the above organisation."
                                                                        />
                                                                    </p>
                                                                    <Field
                                                                        name={
                                                                            makeName(
                                                                                q.name
                                                                            ) +
                                                                            "_score"
                                                                        }
                                                                        type="text"
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
                                                                            q.name +
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

export default NotationModal;
