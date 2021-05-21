import React from "react";
import { Link } from "react-router-dom";

const StatementABC = (props) => {
    const fundData = props.fund;

    const add = fundData.impactabc.doing.includes("act-dd");
    const at = fundData.impactabc.doing.includes("act-thirdparty");
    const ad = fundData.impactabc.doing.includes("act-dataused");
    const ao = fundData.impactabc.doing.includes("act-outcomes");
    const aot = fundData.impactabc.doing.includes("act-other");
    const anyA = add || at || ad || ao || aot;

    const be = fundData.impactabc.doing.includes("benefit-existing");
    const bd = fundData.impactabc.doing.includes("benefit-dataused");
    const bo = fundData.impactabc.doing.includes("benefit-outcome");
    const bot = fundData.impactabc.doing.includes("benefit-other");
    const anyB = be || bd || bo || bot;

    const ce = fundData.impactabc.doing.includes("contribute-existing");
    const cd = fundData.impactabc.doing.includes("contribute-dataused");
    const co = fundData.impactabc.doing.includes("contribute-outcome");
    const cot = fundData.impactabc.doing.includes("contribute-other");
    const anyC = ce || cd || co || cot;

    return (
        <div>
            <div className="performancebox">
                <ul className="buttons nav nav-tabs">
                    <li className="nav-item">
                        <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#home"
                        >
                            Act to avoid harm
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#menu1">
                            Benefit stakeholders
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#menu2">
                            Contribute to solutions
                        </a>
                    </li>
                </ul>

                <div className="dline">
                    <div className="greenline">
                        <div className="dot" />
                    </div>
                </div>
            </div>

            <div className="tab-content">
                <div className="tab-pane  active" id="home">
                    {!anyA ? (
                        <div className="boxofp">
                            <p>No appropriate factors identified.</p>
                        </div>
                    ) : null}

                    {fundData.impactabc.doing.includes("act-dd") ? (
                        <div className="boxofp">
                            <p >
                                <span>
                                    Rely on due diligence conducted prior to
                                    investment
                                </span>
                                <br />
                                Conduct a thorough analysis of expected social
                                and environmental impact before investment.
                            </p>
                        </div>
                    ) : null}

                    {fundData.impactabc.doing.includes("act-thirdparty") ? (
                        <div className="boxofp">
                            <p>
                                <span>Third-party ratings</span>
                                <br />
                                We use ratings from third-party data providers
                                to determine whether underlying assets are
                                mitigating or reducing negative outcomes.
                            </p>
                        </div>
                    ) : null}

                    {fundData.impactabc.doing.includes("act-dataused") ? (
                        <div className="boxofp">
                            <p>
                                <span>
                                    Data used as proxies for negative outcomes
                                </span>
                                <br />
                                The data from underlying assets include proxy
                                measures, which give some confidence that
                                negative outcomes have been mitigated or
                                reduced.
                            </p>
                        </div>
                    ) : null}

                    {fundData.impactabc.doing.includes("act-outcomes") ? (
                        <div className="boxofp">
                            <p>
                                <span>Outcomes data</span>
                                <br />
                                Our underlying underlying assets report data
                                that directly measures negative outcomes they
                                are mitigating or reducing.
                            </p>
                        </div>
                    ) : null}

                    {fundData.impactabc.doing.includes("act-other") ? (
                        <div className="boxofp">
                            <p>
                                <span>Other</span>
                                <br />
                                {fundData.impactabc.act_other}
                            </p>
                        </div>
                    ) : null}
                </div>

                <div className="tab-pane  fade" id="menu1">
                    {!anyB ? (
                        <div className="boxofp">
                            <p>No appropriate factors identified.</p>
                        </div>
                    ) : null}

                    {fundData.impactabc.doing.includes("benefit-dd") ? (
                        <div className="boxofp">
                            <p>
                                <span>
                                    Rely on due diligence conducted prior to
                                    investment
                                </span>
                                <br />
                                Conduct a thorough analysis of expected social
                                and environmental impact before investment.
                            </p>
                        </div>
                    ) : null}

                    {fundData.impactabc.doing.includes("benefit-existing") ? (
                        <div className="boxofp">
                            <p>
                                <span>Existing Research</span>
                                <br />
                                We use existing research to understand if the
                                sectors represented in the portfolio are likely
                                to generate positive outcomes.
                            </p>
                        </div>
                    ) : null}

                    {fundData.impactabc.doing.includes("benefit-dataused") ? (
                        <div className="boxofp">
                            <p>
                                <span>
                                    Data used as proxies for positive outcomes
                                </span>
                                <br />
                                The data from underlying assets include proxy
                                measures, which give some confidence that
                                positive outcomes have occurred.
                            </p>
                        </div>
                    ) : null}

                    {fundData.impactabc.doing.includes("benefit-outcome") ? (
                        <div className="boxofp">
                            <p>
                                <span>Outcome data</span>
                                <br />
                                Our underlying assets report data that directly
                                measures positive outcomes being generated.
                            </p>
                        </div>
                    ) : null}

                    {fundData.impactabc.doing.includes("benefit-other") ? (
                        <div className="boxofp">
                            <p>
                                <span>Other</span>
                                <br />
                                {fundData.impactabc.benefit_other}
                            </p>
                        </div>
                    ) : null}
                </div>

                <div className="tab-pane  fade" id="menu2">
                    {!anyC ? (
                        <div className="boxofp">
                            <p>No appropriate factors identified.</p>
                        </div>
                    ) : null}

                    {fundData.impactabc.doing.includes(
                        "contribute-existing"
                    ) ? (
                        <div className="boxofp">
                            <p>
                                <span>Existing research</span>
                                <br />
                                We use existing research to understand if the
                                sectors represented in the portfolio are likely
                                to generate positive outcomes. We also collect
                                data on whether the stakeholders affected would
                                have experienced the outcomes below nationally
                                or locally acceptable levels in absence of an
                                asset's activities.
                            </p>
                        </div>
                    ) : null}

                    {fundData.impactabc.doing.includes(
                        "contribute-dataused"
                    ) ? (
                        <div className="boxofp">
                            <p>
                                <span>
                                    Data used as proxies for positive outcomes
                                </span>
                                <br />
                                The data from underlying assets include proxy
                                measures, which give some confidence that
                                positive outcomes have occurred. We also collect
                                data on whether the stakeholders affected would
                                have experienced the outcomes below nationally
                                or locally acceptable levels in absence of an
                                asset's activities.
                            </p>
                        </div>
                    ) : null}

                    {fundData.impactabc.doing.includes("contribute-outcome") ? (
                        <div className="boxofp">
                            <p>
                                <span>Outcome data</span>
                                <br />
                                Our underlying assets report data that directly
                                measures positive outcomes being generated. We
                                also collect data on whether the stakeholders
                                affected would have experienced the outcomes
                                below nationally or locally acceptable levels in
                                absence of an asset's activities.
                            </p>
                        </div>
                    ) : null}

                    {fundData.impactabc.doing.includes("contribute-other") ? (
                        <div className="boxofp">
                            <p>
                                <span>Other</span>
                                <br />
                                {fundData.impactabc.contribute_other}
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default StatementABC;
