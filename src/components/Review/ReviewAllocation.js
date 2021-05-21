import React from "react";

const boxHighlight = {
    backgroundColor: "#e2e2e2", 
};

const boxHighlightTag = {
    padding: "0px 10px",
    "border-radius": "8px",
    "background-color": "#aaa",
    color: "white",
    "font-size": "9px",
    textTransform:'uppercase',
    width:'70%',
    margin: '0 auto',
    marginBottom:'10px'
};

const AllocBox = (props) => {
    const data = props.boxfield;
    const isDataMoreThan50 = data > 49 ? true : false;

    return (
        <div className="box" style={isDataMoreThan50 ? boxHighlight : null}>
            <p className="procentdone">
                {isDataMoreThan50 ? ( 
                    <div>

                    <div style={boxHighlightTag}>Focus</div>
                    <div>{data}<span>%</span></div>
                    </div>
                ) : <div>{data}<span>%</span></div>}

            </p>
        </div>
    );
};

const ReviewAllocation = (props) => {
    const a = props.fund.allocation;

    if (!a)
        return (
            <div>
                <br />
            </div>
        );

    var total = 0;

    for (let [key, value] of Object.entries(a)) {
        total += value;
    }

    if (total < 1)
        return (
            <div>
                <br />
            </div>
        );

    const showRow1 = a["c1h"] || a["c1a"] || a["c1b"] || a["c1c"];
    const showRow2 = a["c2h"] || a["c2a"] || a["c2b"] || a["c2c"];
    const showRow3 = a["c3h"] || a["c3a"] || a["c3b"] || a["c3c"];
    const showRow4 = a["c4h"] || a["c4a"] || a["c4b"] || a["c4c"];
    const showRow5 = a["c5h"] || a["c5a"] || a["c5b"] || a["c5c"];
    const showRow6 = a["c6h"] || a["c6a"] || a["c6b"] || a["c6c"];

    return (
        <div className="impactclasstabledone">
            <div className="impactclasstable">
                <div className="boxes">
                    <div className="firstboxes">
                        {showRow1 ? (
                            <div className="box">
                                <p className="no">1</p>
                                <div className="co">
                                    <p className="ti">
                                        <span>+</span> Signal that impact
                                        matters
                                    </p>
                                    <p className="normal">Engage actively</p>
                                    <p className="normal">
                                        Grow new/undersupplied capital markets
                                    </p>
                                    <p className="normal">
                                        Provide flexibility on risk-adjusted
                                        return
                                    </p>
                                </div>
                            </div>
                        ) : null}
                        {showRow2 ? (
                            <div className="box">
                                <p className="no">2</p>
                                <div className="co">
                                    <p className="ti">
                                        <span>+</span> Signal that impact
                                        matters
                                    </p>
                                    <p className="ti">
                                        <span>+</span> Engage actively
                                    </p>
                                    <p className="normal">
                                        Grow new/undersupplied capital markets
                                    </p>
                                    <p className="normal">
                                        Provide flexibility on risk-adjusted
                                        return
                                    </p>
                                </div>
                            </div>
                        ) : null}
                        {showRow3 ? (
                            <div className="box">
                                <p className="no">3</p>
                                <div className="co">
                                    <p className="ti">
                                        <span>+</span> Signal that impact
                                        matters
                                    </p>
                                    <p className="normal">Engage actively</p>
                                    <p className="ti">
                                        <span>+</span> Grow new/undersupplied
                                        capital markets
                                    </p>
                                    <p className="normal">
                                        Provide flexibility on risk-adjusted
                                        return
                                    </p>
                                </div>
                            </div>
                        ) : null}
                        {showRow4 ? (
                            <div className="box">
                                <p className="no">4</p>
                                <div className="co">
                                    <p className="ti">
                                        <span>+</span> Signal that impact
                                        matters
                                    </p>
                                    <p className="ti">
                                        <span>+</span> Engage actively
                                    </p>
                                    <p className="ti">
                                        <span>+</span> Grow new/undersupplied
                                        capital markets
                                    </p>
                                    <p className="normal">
                                        Provide flexibility on risk-adjusted
                                        return
                                    </p>
                                </div>
                            </div>
                        ) : null}
                        {showRow5 ? (
                            <div className="box">
                                <p className="no">5</p>
                                <div className="co">
                                    <p className="ti">
                                        <span>+</span> Signal that impact
                                        matters
                                    </p>
                                    <p className="normal">Engage actively</p>
                                    <p className="ti">
                                        <span>+</span> Grow new/undersupplied
                                        capital markets
                                    </p>
                                    <p className="ti">
                                        <span>+</span> Provide flexibility on
                                        risk-adjusted return
                                    </p>
                                </div>
                            </div>
                        ) : null}
                        {showRow6 ? (
                            <div className="box">
                                <p className="no">6</p>
                                <div className="co">
                                    <p className="ti">
                                        <span>+</span> Signal that impact
                                        matters
                                    </p>
                                    <p className="ti">
                                        <span>+</span> Engage actively
                                    </p>
                                    <p className="ti">
                                        <span>+</span> Grow new/undersupplied
                                        capital markets
                                    </p>
                                    <p className="ti">
                                        <span>+</span> Provide flexibility on
                                        risk-adjusted return
                                    </p>
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div className="others">
                        <div className="sections">
                            <div className="mycauseharm">
                                <p style={{ width: "100%" }}>
                                    MAY CAUSE <br />
                                    HARM
                                </p>
                            </div>
                            <div className="bluelable">
                                <div className="first">
                                    <p>ACT TO AVOID HARM</p>
                                </div>
                                <div className="nth2">
                                    <div className="tit">
                                        <p>BENEFIT STAKEHOLDERS</p>
                                    </div>
                                </div>
                                <div className="nth3">
                                    <div className="tit">
                                        <p>CONTRIBUTE SOLUTIONS</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Col1  ------------------------------------ */}
                        <div className="mbx">
                            <div className="row1">
                                {showRow1 ? (
                                    <AllocBox boxfield={a["c1h"]}></AllocBox>
                                ) : null}
                                {showRow2 ? (
                                    <AllocBox boxfield={a["c2h"]}></AllocBox>
                                ) : null}
                                {showRow3 ? (
                                    <AllocBox boxfield={a["c3h"]}></AllocBox>
                                ) : null}
                                {showRow4 ? (
                                    <AllocBox boxfield={a["c4h"]}></AllocBox>
                                ) : null}
                                {showRow5 ? (
                                    <AllocBox boxfield={a["c5h"]}></AllocBox>
                                ) : null}
                                {showRow6 ? (
                                    <AllocBox boxfield={a["c6h"]}></AllocBox>
                                ) : null}
                            </div>
                        </div>

                        {/* Col1  ------------------------------------ */}
                        <div className="mbx">
                            <div className="row1">
                                {showRow1 ? (
                                    <AllocBox boxfield={a["c1a"]}></AllocBox>
                                ) : null}
                                {showRow2 ? (
                                    <AllocBox boxfield={a["c2a"]}></AllocBox>
                                ) : null}
                                {showRow3 ? (
                                    <AllocBox boxfield={a["c3a"]}></AllocBox>
                                ) : null}
                                {showRow4 ? (
                                    <AllocBox boxfield={a["c4a"]}></AllocBox>
                                ) : null}
                                {showRow5 ? (
                                    <AllocBox boxfield={a["c5a"]}></AllocBox>
                                ) : null}
                                {showRow6 ? (
                                    <AllocBox boxfield={a["c6a"]}></AllocBox>
                                ) : null}
                            </div>
                        </div>

                        {/* Col3  ------------------------------------ */}
                        <div className="mbx">
                            <div className="row1">
                                {showRow1 ? (
                                    <AllocBox boxfield={a["c1b"]}></AllocBox>
                                ) : null}
                                {showRow2 ? (
                                    <AllocBox boxfield={a["c2b"]}></AllocBox>
                                ) : null}
                                {showRow3 ? (
                                    <AllocBox boxfield={a["c3b"]}></AllocBox>
                                ) : null}
                                {showRow4 ? (
                                    <AllocBox boxfield={a["c4b"]}></AllocBox>
                                ) : null}
                                {showRow5 ? (
                                    <AllocBox boxfield={a["c5b"]}></AllocBox>
                                ) : null}
                                {showRow6 ? (
                                    <AllocBox boxfield={a["c6b"]}></AllocBox>
                                ) : null}
                            </div>
                        </div>

                        {/* Col1  ------------------------------------ */}
                        <div className="mbx">
                            <div className="row1">
                                {showRow1 ? (
                                    <AllocBox boxfield={a["c1c"]}></AllocBox>
                                ) : null}
                                {showRow2 ? (
                                    <AllocBox boxfield={a["c2c"]}></AllocBox>
                                ) : null}
                                {showRow3 ? (
                                    <AllocBox boxfield={a["c3c"]}></AllocBox>
                                ) : null}
                                {showRow4 ? (
                                    <AllocBox boxfield={a["c4c"]}></AllocBox>
                                ) : null}
                                {showRow5 ? (
                                    <AllocBox boxfield={a["c5c"]}></AllocBox>
                                ) : null}
                                {showRow6 ? (
                                    <AllocBox boxfield={a["c6c"]}></AllocBox>
                                ) : null}
                            </div>
                        </div>
                        {/* --------------- */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewAllocation;
