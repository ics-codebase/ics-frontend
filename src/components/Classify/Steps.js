import React, { useState } from "react";

const Steps = (props) => {
    var lineFinished = "";
    var l1,
        l2,
        l3,
        l4,
        l5,
        l6,
        l7,
        l8 = false;

    if (props.lineat === "practice") {
        l1 = true;
        lineFinished = "finished1";
    }

    if (props.lineat === "performance") {
        l1 = l2 = true;
        lineFinished = "finished2";
    }

    if (props.lineat === "impactabc") {
        l1 = l2 = l3 = true;
        lineFinished = "finished3";
    }

    if (props.lineat === "impactsdg") {
        l1 = l2 = l3 = l4 = true;
        lineFinished = "finished4";
    }

    if (props.lineat === "investor") {
        l1 = l2 = l3 = l4 = l5 = true;
        lineFinished = "finished5";
    }

    if (props.lineat === "allocation") {
        l1 = l2 = l3 = l4 = l5 = l6 = true;
        lineFinished = "finished6";
    }

    if (props.lineat === "rating") {
        l1 = l2 = l3 = l4 = l5 = l6 = l7 = true;
        lineFinished = "finished7";
    }

    if (props.lineat === "review") {
        l1 = l2 = l3 = l4 = l5 = l6 = l7 = l8 = true;
        lineFinished = "finished8";
    }

    return (
        <div className="finishedline">
            <div className="grayline">
                <div className="dot1 dot">
                    <div className={l1 ? "text finishedtext" : "text"}>
                        <p>Practice</p>
                    </div>
                </div>
                <div className="dot2 dot">
                    <div className={l2 ? "text finishedtext" : "text"}>
                        <p>Performance</p>
                    </div>
                </div>
                <div className="dot3 dot">
                    <div className={l3 ? "text finishedtext" : "text"}>
                        <p>Impact of underlying assets (ABC)</p>
                    </div>
                </div>
                <div className="dot4 dot">
                    <div className={l4 ? "text finishedtext" : "text"}>
                        <p>
                            Impact <br /> by SDG
                        </p>
                    </div>
                </div>
                <div className="dot5 dot">
                    <div className={l5 ? "text finishedtext" : "text"}>
                        <p>Investor contribution</p>
                    </div>
                </div>
                <div className="dot6 dot">
                    <div className={l6 ? "text finishedtext" : "text"}>
                        <p>Impact class allocation</p>
                    </div>
                </div>
                <div className="dot7 dot">
                    <div className={l7 ? "text finishedtext" : "text"}>
                        <p>Ratings and affiliations</p>
                    </div>
                </div>
                <div className="dot8 dot">
                    <div className={l8 ? "text finishedtext" : "text"}>
                        <p>
                            Review <br />
                            &amp; confirm
                        </p>
                    </div>
                </div>

                <div className={"finished " + lineFinished} />
            </div>
        </div>
    );
};

export default Steps;
