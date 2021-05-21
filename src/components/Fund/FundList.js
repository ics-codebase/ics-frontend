// Render Prop
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function renderTooltip(props) {
    return (
        <Tooltip id="button-tooltip" {...props}>
            Please note: Starting the reclassification process will require you
            to review all your selections again and invalidates the existing
            classification statement.
        </Tooltip>
    );
}

const FundList = (props) => {
    return props.fundlist.map((f, i) => {
        const publishDate = moment(f.dateclassified).format("YYYY-MM-DD");

        return (
            <p className="rowp" key={f._id}>
                <Link to={"/fund/manage/" + f._id}>{f.name}</Link>

                <span className="sec_c_side">
                    {f.published === "published" ? (
                        <Link to={"/statement/" + f._id}>STATEMENT</Link>
                    ) : (
                        ""
                    )}
                    {f.published === "approvalrequest" ? (
                        <Link  to={"/classify/" + f._id + "/review"}>EDIT</Link>
                    ) : (
                        ""
                    )}
                    {f.published === "unpublished" ? (
                        <Link  to={"/classify/" + f._id + "/review"}>EDIT</Link>
                    ) : (
                        ""
                    )}
                    {f.published === "" 
                        ? "-"
                        : ""}
                </span>

                <span className="sec_b_side">
                    {f.published === "published" ? publishDate : "-"}
                </span>

                <span className="actionspan">
                    {f.published === "published" ? (
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 0, hide: 0 }}
                            overlay={renderTooltip}
                            placement="left"
                        >
                            <Link
                                to={"/classify/" + f._id + "/start"}
                                className="greyd"
                            >
                                Reclassify?
                            </Link>
                        </OverlayTrigger>
                    ) : null}

                    {f.published === "unpublished" ? (
                        <Link
                            to={"/classify/" + f._id + "/start"}
                            className="orangea"
                        >
                            In progress
                        </Link>
                    ) : null}

                    {f.published === "cloned" ? (
                        <Link
                            to={"/classify/" + f._id + "/start"}
                            className="greenb"
                        >
                            New Clone
                        </Link>
                    ) : null}

                    {f.published === "approvalrequest" ? (
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 0, hide: 0 }}
                            overlay={
                                <Tooltip id="button-tooltip" {...props}>
                                    Statement has been submitted for
                                    publication. We will review and approve to
                                    directory shortly.
                                </Tooltip>
                            }
                            placement="left"
                        >
                            <Link
                                to={"/classify/" + f._id + "/start"}
                                className="greyd"
                            >
                                Pending ...
                            </Link>
                        </OverlayTrigger>
                    ) : null}

                    {f.published === "" ? (
                        <Link
                            to={"/classify/" + f._id + "/start"}
                            className="bluec"
                        >
                            Classify Now
                        </Link>
                    ) : null}
                </span>
            </p>
        );
    });
};

export default FundList;
