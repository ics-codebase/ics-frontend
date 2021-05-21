import React, { useState } from "react";
import { observer } from "mobx-react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ScrollToTop from "../Router/ScrollToTop";
import { FundStore } from "../../store/FundStore";
import { useStores } from "../../hooks/use-stores";

import ReviewInvestorContibution from "../../components/Review/ReviewInvestorContribution";
import ImpactABC from "../../components/Review/ImpactABC";
import ReviewCheck from "../../components/Review/ReviewCheck";
import ReviewQuestions from "../../components/Review/ReviewQuestions";
import ImpactSDG from "../Review/ImpactSDG";
import ReviewAllocation from "../Review/ReviewAllocation";
import ReviewFundData from "../Review/ReviewFundData";
import ReviewMainImpactAreas from "../Review/ReviewMainImpactAreas";

const QuestionDisplay = (props) => {
    return (
        <div>
            <div className="subtitle">
                <h4>{props.title}</h4>
            </div>
            <ReviewQuestions fund={props.fund} questionpath={props.qp} />
            <div className="silverline" />
        </div>
    );
};

const ReviewForm = observer((props) => {
    var fund = props.fund;
    let history = useHistory();
    let { id } = useParams();

    function goBack() {
        history.push("/classify/" + id + "/allocation");
    }

    return (
        <div>
            <div className="borderbox">
                {fund && (
                    <ReviewFundData
                        fund={fund}
                        id={id}
                        reviewOrStatement="review"
                    />
                )}
            </div>

            <div className="borderbox">
                <h2>
                    Practice{" "}
                    <Link to={"/classify/" + id + "/practice?review=true"}>
                        Edit
                    </Link>{" "}
                </h2>

                <QuestionDisplay
                    fund={fund}
                    title="Does the fund embed advancing development and the SDGs in its purpose and strategy?"
                    qp="practice/sdgpurpose"
                />

                <QuestionDisplay
                    fund={fund}
                    title="Does the fund integrate impact management into its operations and management approach?"
                    qp="practice/sdgmanagement"
                />

                <QuestionDisplay
                    fund={fund}
                    title="Does the fund disclose its impact performance and how it integrates impact management into its strategy, management approach, decision making and governance?"
                    qp="practice/sdgtransparency"
                />

                <QuestionDisplay
                    fund={fund}
                    title="Is the fund commitment to advancing sustainable development and the SDGs reinforced through governance practices of the fund and the fund manager?"
                    qp="practice/sdggov"
                />

                <div className="subtitle">
                    <h4>
                        Does the fund adhere to any principles of responsible
                        investment practice?
                    </h4>
                </div>
                <ReviewQuestions
                    fund={fund}
                    questionpath="practice/responsibleinvestment"
                />
                <div className="silverline" />

                <div className="subtitle">
                    <h4>
                        Does the fund use any other resources, guidance or
                        methodologies?
                    </h4>
                </div>

                <ReviewQuestions fund={fund} questionpath="practice/guidance" />

                <div className="silverline" />

                <div className="subtitle">
                    <h4>As part of it’s practices, the fund:</h4>
                </div>

                <ReviewCheck
                    fund={fund}
                    questionpath="practice/partofpractice"
                />

                <div className="silverline" />

                <div className="subtitle">
                    <h4>Are the fund’s practices assured?</h4>
                </div>

                <ReviewQuestions
                    fund={fund}
                    questionpath="practice/auditandassurance"
                />
            </div>

            <div className="borderbox">
                <h2>
                    Performance
                    <Link to={"/classify/" + id + "/performance?review=true"}>
                        Edit
                    </Link>{" "}
                </h2>
                <div className="subtitle">
                    <h4>
                        {" "}
                        Does the fund use any third-party sources of social and
                        environmental performance data?
                    </h4>
                </div>

                <ReviewQuestions
                    fund={fund}
                    questionpath="performance/performancesource"
                />

                <div className="silverline" />

                <div className="subtitle">
                    <h4>
                        Does the fund regularly obtain data against any
                        particular disclosures or metrics from underlying
                        assets?
                    </h4>
                </div>

                <ReviewQuestions
                    fund={fund}
                    questionpath="performance/regulardisclosures"
                />

                <div className="silverline" />

                <div className="subtitle">
                    <h4>
                        Does the fund assure its social and environmental
                        performance data?
                    </h4>
                </div>

                <ReviewQuestions
                    fund={fund}
                    questionpath="performance/auditperformance"
                />
            </div>

            <div className="borderbox">
                <h2>
                    Impact of underlying assets{" "}
                    <Link to={"/classify/" + id + "/impactabc?review=true"}>
                        Edit
                    </Link>{" "}
                </h2>

                <ImpactABC fund={fund} />
            </div>

            <div className="borderbox">
                <h2>
                    Impact by SDG{" "}
                    <Link to={"/classify/" + id + "/impactsdg?review=true"}>
                        Edit
                    </Link>{" "}
                </h2>

                <ImpactSDG fund={fund} />

                <div
                    className="subtitle"
                    style={{ "padding-top": "20px", "padding-bottom": "20px" }}
                >
                    <h4>
                        <i>
                            If applicable to your fund, express up to three main
                            impact areas (optional):
                        </i>
                    </h4>
                </div>

                <ReviewMainImpactAreas fund={fund} />
            </div>

            <div className="borderbox">
                <h2>
                    Investor contribution{" "}
                    <Link to={"/classify/" + id + "/investor?review=true"}>
                        Edit
                    </Link>{" "}
                </h2>

                <ReviewInvestorContibution fund={fund} />
            </div>

            <div className="borderbox borderboxica">
                <h2>
                    Impact allocation{" "}
                    <Link to={"/classify/" + id + "/allocation?review=true"}>
                        Edit
                    </Link>{" "}
                </h2>

                <ReviewAllocation fund={fund} />
            </div>

            <div className="borderbox borderboxraa">
                <h2>
                    Ratings and Affiliations{" "}
                    <Link to={"/classify/" + id + "/rating?review=true"}>
                        Edit
                    </Link>{" "}
                </h2>

                <div className="subtitle">
                    <h4>Is the fund affiliated with another organisation?</h4>
                </div>

                <ReviewQuestions
                    fund={fund}
                    questionpath="ratings/affiliated"
                />

                <div className="silverline" />

                <div className="subtitle">
                    <h4>Is the fund rated by any ratings providers?</h4>
                </div>

                <ReviewQuestions fund={fund} questionpath="ratings/providers" />
            </div>
        </div>
    );
});

export default ReviewForm;
