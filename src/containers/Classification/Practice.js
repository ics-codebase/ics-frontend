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
                            <br />
                            <p
                                style={{
                                    textAlign: "left",
                                    color: "#FFA057",
                                    fontSize: "24px",
                                }}
                            >
                                Alignment with UNDP’s SDG Impact Standards
                            </p>

                            <p
                                style={{
                                    textAlign: "left",
                                    fontFamily: "ProximaNovaRegular",
                                    color: "#293130",
                                    fontSize: "16px",
                                }}
                            >
                                This section aims to identify how your impact
                                practices align with{" "}
                                <a
                                    target="top"
                                    href="https://sdgimpact.undp.org/practice-standards.html"
                                >
                                    UNDP’s SDG Impact Standards
                                </a>
                                 at a high level. The below questions
                                constitute a preliminary assessment on how you
                                are acting to advance sustainable development
                                and the SDGs. If you have started aligning your
                                practices to the SDGs, choose the ‘Yes, in
                                progress’ option and provide information around
                                your activities selecting ‘Additional
                                information’.
                            </p>

                            <p
                                style={{
                                    textAlign: "left",
                                    fontFamily: "ProximaNovaRegular",
                                    color: "#293130",
                                    fontSize: "16px",
                                }}
                            >
                                Please note, this section does not indicate that
                                practices have been assured and is solely meant
                                as an initial indication of alignment
                                (self-reported).
                            </p>
                            <br />

                            <DetailsQuestion
                                fundid={id}
                                thefund={fund}
                                questionpath="practice/sdgpurpose"
                                title="Does the fund embed advancing development and the SDGs in its <span>purpose and strategy</span>?"
                                notitle="No, it does not"
                                yestitle="Yes, in progress"
                                detailtitle="DETAILS"
                                questions={[
                                    {
                                        id: "strat1",
                                        answer:
                                            "The fund embeds advancing sustainable development and the SDGs into its purpose and investment strategy.",
                                        score: false,
                                    },
                                    {
                                        id: "strat2",
                                        answer:
                                            "The fund develops an impact thesis (or theses).",
                                        score: false,
                                        other: true,
                                        infobox:
                                            "This includes drawing on insights from stakeholders and reputable agencies to inform its approach",
                                    },
                                    {
                                        id: "strat3",
                                        answer:
                                            "The fund sets impact goals at the portfolio level aligned with its impact thesis.",
                                        infobox:
                                            "This includes ensuring the fund's intended impact (scale or depth) is commensurate with the size of the fund",
                                    },
                                    {
                                        id: "strat4",
                                        answer:
                                            "The fund reviews its impact thesis, investment strategy and portfolio level impact goals at least annually.",
                                        infobox:
                                            "This includes incorporating lessons from impact performance and responding to changes in the sustainable development context",
                                    },
                                    {
                                        id: "other",
                                        answer: "Additional information?",
                                        score: false,
                                        link: false,
                                        other: true,
                                    },
                                ]}
                            />
                            <DetailsQuestion
                                fundid={id}
                                thefund={fund}
                                questionpath="practice/sdgmanagement"
                                title="Does the fund integrate impact management into its <span>operations and management approach</span>?"
                                notitle="No, it does not"
                                yestitle="Yes, in progress"
                                detailtitle="DETAILS"
                                questions={[
                                    {
                                        id: "man1",
                                        answer:
                                            "The fund integrates accountability for impact management in its management approach.",
                                        infobox:
                                            "This includes aligning incentives",
                                    },
                                    {
                                        id: "man2",
                                        answer:
                                            "The fund assesses the expected impacts of its investments and makes informed choices in line with its impact goals.",
                                        infobox:
                                            "This includes investor contributions the fund expects to make (through its own actions) to the impact performance of each investment.",
                                    },
                                    {
                                        id: "man3",
                                        answer:
                                            "The fund sets impact targets at the investment level.",
                                    },
                                    {
                                        id: "man4",
                                        answer:
                                            "The fund monitors and manages its impact performance overall and for each investment, including at exit.",
                                        infobox:
                                            "This includes considering which metrics to use and how much data is sufficient to make a decision.",
                                    },
                                    {
                                        id: "other",
                                        answer: "Additional information?",
                                        score: false,
                                        link: false,
                                        other: true,
                                    },
                                ]}
                            />
                            <DetailsQuestion
                                fundid={id}
                                thefund={fund}
                                questionpath="practice/sdgtransparency"
                                title="Does the fund <span>disclose</span> its impact performance and how it integrates impact management into its strategy, management approach, decision making and governance?"
                                notitle="No, it does not"
                                yestitle="Yes, in progress"
                                detailtitle="DETAILS"
                                questions={[
                                    {
                                        id: "trans1",
                                        answer:
                                            "The fund discloses how impact is integrated into strategy, management approach, decision making and governance.",
                                        infobox:
                                            "This includes publicly disclosing responsible business policies.",
                                    },
                                    {
                                        id: "trans2",
                                        answer:
                                            "The fund publicly reports on impact annually (impact report).",
                                        link: true,
                                    },
                                    {
                                        id: "trans3",
                                        answer:
                                            "The fund uses the SDGs to communicate impact to stakeholders.",
                                    },
                                    {
                                        id: "trans4",
                                        answer:
                                            "The fund uses IMP’s 5 dimensions of impact and ABC impact classifications to communicate impact to stakeholders.",
                                    },
                                    {
                                        id: "other",
                                        answer: "Additional information?",
                                        score: false,
                                        link: false,
                                        other: true,
                                    },
                                ]}
                            />
                            <DetailsQuestion
                                fundid={id}
                                thefund={fund}
                                questionpath="practice/sdggov"
                                title="Is the fund commitment to advancing sustainable development and the SDGs reinforced through <span>governance practices</span> of the fund and the fund manager?"
                                notitle="No, it does not"
                                yestitle="Yes, in progress"
                                detailtitle="DETAILS"
                                questions={[
                                    {
                                        id: "gov1",
                                        answer:
                                            "The fund and fund manager integrate responsible business practices and impact management into governance practice and oversight.",
                                        infobox:
                                            "This includes recognising the implications of low accountability to those impacted and the need to act on their behalf in decisions.",
                                    },
                                    {
                                        id: "gov2",
                                        answer:
                                            "The fund includes sustainability and impact management competencies, and diversity within its governance body.",
                                    },
                                    {
                                        id: "gov3",
                                        answer:
                                            "The fund holds management accountable for responsible business and impact management practices.",
                                    },
                                    {
                                        id: "gov4",
                                        answer:
                                            "The fund takes a risk-based approach to third-party assurance of impact data, impact assessments and external impact reporting.",
                                    },
                                    {
                                        id: "other",
                                        answer: "Additional information?",
                                        score: false,
                                        link: false,
                                        other: true,
                                    },
                                ]}
                            />
                            <br />
                            <p
                                style={{
                                    textAlign: "left",
                                    color: "#FFA057",
                                    fontSize: "24px",
                                }}
                            >
                                Adherence with best-practices and guidance
                            </p>

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
                                        answer: "EVPA (5-step Process)",
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
                            <div className="silverline" />

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
