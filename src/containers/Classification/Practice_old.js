import React, { Component } from "react";
import { withRouter } from "react-router";
import { useHistory, useParams } from "react-router-dom";
import DetailsQuestion from "../../components/Classify/DetailsQuestion";
import CheckQuestion from "../../components/Classify/CheckQuestion";
import { useStores } from "../../hooks/use-stores";
import ScrollToTop from "../../components/Router/ScrollToTop";
import ModalInfo from "../../components/UI/ModalInfo";
import * as QueryString from "query-string";
import Steps from "../../components/Classify/Steps";

const Practice = (props) => {
    let history = useHistory();
    let { id } = useParams();

    const { fundStore } = useStores();
    const fund = fundStore.funds.find((x) => x._id === id);

    function saveAndContinue() {
        const r = fundStore.saveFund(fund);

        const params = QueryString.parse(props.location.search);
        if (params.review) {
            history.push("/classify/" + id + "/review");
        } else {
            history.push("/classify/" + id + "/performance");
        }
    }

    function goBack() {
        history.push("/organisation/securities");
    }

    return (
        <div>
            <ScrollToTop />
            <div className="container-fluid step1_container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Steps lineat="practice" />
                            <h1>Step 1: Practice</h1>
                            <p className="desc">
                                A fund’s practices (processes and procedures)
                                provide an early signal about its expected
                                impacts on people, the environment or the
                                economy. Fill in detail on the fund’s practices
                                below.
                            </p>

                            <ModalInfo url="https://james536236.typeform.com/to/sboVUe" />

                            <DetailsQuestion
                                fundid={id}
                                thefund={fund}
                                questionpath="practice/responsibleinvestment"
                                title="Does the fund adhere to any principles of responsible investment practice?"
                                notitle="No, it does not"
                                yestitle="Yes, it does"
                                detailtitle="DETAILS"
                                questions={[
                                    {
                                        id: "ifc",
                                        answer:
                                            "Operating Principles for Impact Management",
                                        score: false,
                                        link: true,
                                    },
                                    {
                                        id: "grbopr",
                                        answer: "Green Bond Principles",
                                        score: false,
                                        link: true,
                                    },
                                    {
                                        id: "sobopr",
                                        answer: "Social Bond Principles",
                                        score: false,
                                        link: true,
                                    },
                                    {
                                        id: "other",
                                        answer: "Other",
                                        other: true,
                                    },
                                ]}
                            />

                            <DetailsQuestion
                                fundid={id}
                                thefund={fund}
                                questionpath="practice/guidance"
                                title="Does the fund use any other resources, guidance or methodologies?"
                                notitle="No, it does not"
                                yestitle="Yes, it does"
                                detailtitle="DETAILS"
                                questions={[
                                    {
                                        id: "evpa",
                                        answer:
                                            "EVPA (5-step Process)",
                                        score: false,
                                        link: false,
                                    },
                                    {
                                        id: "giin",
                                        answer:
                                            "GIIN Core Characteristics of Impact Investing",
                                        score: false,
                                        link: false,
                                    },
                                    {
                                        id: "ifcp",
                                        answer: "IFC Performance Standards",
                                        score: false,
                                        link: false,
                                    },
                                    {
                                        id: "oecd",
                                        answer:
                                            "OECD Responsible Business Conduct for Institutional Investors",
                                        score: false,
                                        link: false,
                                    },
                                    {
                                        id: "undp",
                                        answer: "UNDP’s SDG Impact Standards",
                                        score: false,
                                        link: false,
                                    },
                                    {
                                        id: "svi",
                                        answer:
                                            "SVI A guide to Social Return on Investment (SROI)",
                                        score: false,
                                        link: false,
                                    },
                                    {
                                        id: "impy",
                                        answer:
                                            "Impact Management Project (IMP) ",
                                        score: false,
                                        link: false,
                                    },
                                    {
                                        id: "other",
                                        answer: "Other",
                                        other: true,
                                    },
                                ]}
                            />

                            <CheckQuestion
                                fundid={id}
                                thefund={fund}
                                questionpath="practice/partofpractice"
                                title="As part of its practices, the fund:"
                                help="This is help on the main title"
                                questions={[
                                    {
                                        id: "excludesknownharm",
                                        answer:
                                            "<span>Excludes</span> underlying assets/enterprises that cause known harm to people or the planet",
                                        subanswerinstructions:
                                            "Select excluded activities:",
                                        subanswers: [
                                            "Adult entertainment",
                                            "Arms production",
                                            "Arms trade",
                                            "Alcohol production",
                                            "Gambling",
                                            "Nuclear weapons",
                                            "Nuclear energy",
                                            "Fossil fuels",
                                            "Tobacco production",
                                            "Tobacco trade",
                                        ],
                                        allowsOther: true,
                                    },
                                    {
                                        id: "datanegativelyscreen",
                                        answer:
                                            "Use environmental, social and governance data to <span>mitigate near-term financial risk</span>.",
                                        help: "This is help text",
                                    },
                                    {
                                        id: "datapositivelyscreen",
                                        answer:
                                            "Use environmental, social and governance data to <span>maximise medium to long-term financial value.</span>",
                                    },
                                    {
                                        id: "engagestoreduce",
                                        answer:
                                            "Use environmental, social and governance data to <span>select assets that benefit people and the planet.</span>",
                                    },
                                    {
                                        id: "engagestoincrease",
                                        answer:
                                            "Use environmental, social and governance data to <span>specifically target assets that solve social and environmental issues.</span>",
                                    },
                                ]}
                            />

                            <DetailsQuestion
                                fundid={id}
                                thefund={fund}
                                questionpath="practice/auditandassurance"
                                title="Are the fund’s practices assured?"
                                notitle="No, they are not"
                                yestitle="Yes, they are"
                                detailtitle="DETAILS"
                                questions={[
                                    {
                                        id: "ifcint",
                                        answer:
                                            "Operating Principles for Impact Management - Independent Internal",
                                        score: false,
                                        link: true,
                                    },
                                    {
                                        id: "ifcthi",
                                        answer:
                                            "Operating Principles for Impact Management - Independent Third Party",
                                        score: false,
                                        link: true,
                                    },
                                    {
                                        id: "isrla",
                                        answer: "ISR Label",
                                        score: false,
                                        link: true,
                                    },
                                    {
                                        id: "int",
                                        answer: "Internally assured",
                                        score: false,
                                        link: false,
                                    },
                                    {
                                        id: "other",
                                        answer: "Other",
                                        score: false,
                                        link: false,
                                        other: true,
                                    },
                                ]}
                            />

                            <div className="buttonsbtn">
                                <div className="row">
                                    <div className="col-6 leftside">
                                        <button onClick={goBack}>
                                            <span>Back</span>
                                        </button>
                                    </div>
                                    <div className="col-6 rightside">
                                        <button onClick={saveAndContinue}>
                                            <span>Save and Continue</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Practice);
