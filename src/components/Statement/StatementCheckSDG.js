import React from "react";
import Infobox from "../../components/UI/Infobox";
import Linkify from "react-linkify";

const StatementCheck = (props) => {
    const qp = props.questionpath;
    const fund = props.fund;
    const infoboxes = props.infoboxes;

    return (
        <div>
            <div className="ppfororange">
                <div className="orangedivcb whitevcb">
                    {fund.questions
                        .filter((x) => x.questionpath === qp)
                        .map((i) => (
                            <div>
                                <div className="box">
                                    <p className="tit checkaded">
                                        {" "}
                                        {i.id === "other" ? (
                                            <Linkify>{i.other}</Linkify>
                                        ) : (
                                            <>
                                                <Linkify>
                                                    {i.answer}
                                                    &nbsp;
                                                    {i.other}
                                                    &nbsp;
                                                    {i.link}
                                                </Linkify>
                                            </>
                                        )}
                                        {Object.keys(infoboxes)
                                            .filter((ib) => ib === i.id)
                                            .map((ibr) => (
                                                <>
                                                    {" "}
                                                    &nbsp;
                                                    <Infobox
                                                        maxlength="320"
                                                        info={infoboxes[ibr]}
                                                    />
                                                </>
                                            ))}
                                    </p>
{/* 
                                    <p className="cer">
                                        {i.link ? (
                                            <a
                                                style={{
                                                    display: "table-cell",
                                                }}
                                                href={i.link}
                                                target="_blank"
                                            >
                                                {i.answer}
                                            </a>
                                        ) : i.other ? (
                                            <div
                                                style={{
                                                    display: "table-cell",
                                                }}
                                            >
                                                {i.other}
                                            </div>
                                        ) : (
                                            <div>{i.answer}</div>
                                        )}

                                        <span
                                            className="logo"
                                            style={{
                                                color: "#000",
                                                "font-size": "13px",
                                                "text-align": "right",
                                            }}
                                        >
                                            {i.score ? (
                                                <div>Score: {i.score}</div>
                                            ) : null}
                                        </span>
                                    </p> */}


                                </div>
                                {i.subanswers ? (
                                    <div className="box">
                                        {i.subanswers.sort().map((a) => (
                                            <div className="col-md-6" key={a}>
                                                <p>· {a}</p>
                                            </div>
                                        ))}
                                        {qp === "practice/partofpractice" &&
                                        fund.practice_exclusions_other ? (
                                            <div className="col-md-6">
                                                <p className="tit">
                                                    . Other:{" "}
                                                    {
                                                        fund.practice_exclusions_other
                                                    }
                                                </p>
                                            </div>
                                        ) : null}
                                    </div>
                                ) : null}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default StatementCheck;

// <div className="box">
// <p className="tit checkaded">
//     <span>Excludes</span> underlying assets/enterprises that cause known harm to
//     people or the planet
// </p>
// <div className="row paddingleft">
//     <div className="col-md-6">
//         <p>· Adult entertainment</p>
//         <p>· Arms production</p>
//         <p>· Arms trade</p>
//         <p>· Alcohol production</p>
//     </div>
//     <div className="col-md-6">
//         <p>· Human rights abuses</p>
//         <p>· Labour standards abuses</p>
//         <p>· Tobacco production</p>
//         <p>· Other: Condimentum ipsum ullamcorper</p>
//     </div>
// </div>
// </div>
