import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { useHistory, useParams } from "react-router-dom";
import ScrollToTop from "../../components/Router/ScrollToTop";

import { FundStore } from "../../store/FundStore";
import { useStores } from "../../hooks/use-stores";

const Start = (props) => {
    let history = useHistory();
    let { id } = useParams();

    const { fundStore } = useStores();

    const fund = fundStore.funds.find((x) => x._id === id);
    fund.published = "unpublished";
    const r = fundStore.saveFund(fund);

    return (
        <div>
            <ScrollToTop />
            <div className="container-fluid before_we_start">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>7 Steps to classify your fund</h1>
                            <p className="desc" style={{ marginTop: "25px" }}>
                                The IMP+ACT Classification System guides you
                                through a 7-steps digital process that allows
                                you to classify the social and environmental
                                impacts of your funds. <br />
                                <br />
                                The system lists existing standards, guidance,
                                measurement approaches, rating techniques and
                                service providers that practitioners use to
                                measure, manage and classify ESG credentials and
                                impacts of funds. It importantly provides a
                                consistent self-reporting format (Classification
                                Statement) that you can use to start disclosing
                                transparent and comparable information about
                                your impact practice and impact performance.
                            </p>
                            <div className="steps">
                                <p className="step">
                                    <span className="no">
                                        <img
                                            src="/assets/img/bws1.png"
                                            alt=""
                                        />
                                    </span>
                                    <span className="title">
                                        Step 1: Practice
                                    </span>
                                    Provide detail on the processes and
                                    procedures that influence the fund’s
                                    expected impact.
                                </p>
                                <p className="step">
                                    <span className="no">
                                        <img
                                            src="/assets/img/bws2.png"
                                            alt=""
                                        />
                                    </span>
                                    <span className="title">
                                        Step 2: Performance
                                    </span>
                                    Provide detail on the type of data used to
                                    understand actual impact.
                                </p>
                                <p className="step">
                                    <span className="no">
                                        <img
                                            src="/assets/img/bws3.png"
                                            alt=""
                                        />
                                    </span>
                                    <span className="title">
                                        Step 3: Impact of underlying assets
                                        (ABC)
                                    </span>
                                    Assess how the data available helps you
                                    understand the types of impact occurring in
                                    the portfolio.
                                </p>
                                <p className="step">
                                    <span className="no">
                                        <img
                                            src="/assets/img/bws4.png"
                                            alt=""
                                        />
                                    </span>
                                    <span className="title">
                                        Step 4: Impact by SDG
                                    </span>
                                    Express how the fund contributes to the
                                    SDGs.
                                </p>
                                <p className="step">
                                    <span className="no">
                                        <img
                                            src="/assets/img/bws5.png"
                                            alt=""
                                        />
                                    </span>
                                    <span className="title">
                                        Step 5: Investor contribution
                                    </span>
                                    Show the strategies used by the fund to
                                    enable impact within the portfolio.
                                </p>
                                <p className="step">
                                    <span className="no">
                                        <img
                                            src="/assets/img/bws6.png"
                                            alt=""
                                        />
                                    </span>
                                    <span className="title">
                                        Step 6: Impact class allocation
                                    </span>
                                    Show the portfolio allocation across
                                    different impact classes.
                                </p>
                                <p className="step">
                                    <span className="no">
                                        <img
                                            src="/assets/img/bws7.png"
                                            alt=""
                                        />
                                    </span>
                                    <span className="title">
                                        Step 7: Ratings and affiliations
                                    </span>
                                    Add information on fund ratings and
                                    affiliations with other organisation.
                                </p>
                                <p className="step">
                                    <span className="no">
                                        <img
                                            src="/assets/img/bws8.png"
                                            alt=""
                                        />
                                    </span>
                                    <span className="title">
                                        Classification Statement
                                    </span>
                                    Publish your fund classification statement
                                    which consolidates all the entered
                                    information in a practical summary
                                    factsheet. An example for a Classification Statement can be found&nbsp;
                                    <a
                                        target="_blank"
                                        href="/assets/res/statement_acme.pdf"
                                    >
                                        here
                                    </a>.
                                </p>
                            </div>
                            <p className="desc" style={{ marginTop: "50px" }}>
                                For more information please review the following
                                sources and consult the 'Learn More' modules at
                                the beginning of each section for practical
                                examples and guidance.
                            </p>

                            <p>
                                <a
                                    target="_blank"
                                    href="https://impactmanagementproject.zoom.us/rec/play/vsAvcuih-m43HYbEtQSDBvMrW47veK2s0ChMqfIIxEq0UXgDZlGvNLBENLRVbeDLbqmyR3Mg9hpw-1vk?autoplay=true&startTime=1585128905000"
                                >
                                    Demo: An introduction to Impact
                                    Classification
                                </a>
                            </p>

                            <p>
                                <a
                                    target="_blank"
                                    href="https://impactmanagementproject.zoom.us/rec/share/ouUsBo-s9kNOGYnpzR7VA619Q6_Oaaa81yQer_YNn09P17AO4ILaMC-8Re7D4bie?startTime=1591546867000"
                                >
                                    Demo: Classifying funds using the ICS
                                </a>
                            </p>

                            <div className="btnright">
                                <Link to={"/classify/" + id + "/practice"}>
                                    <span>Start</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Start);
