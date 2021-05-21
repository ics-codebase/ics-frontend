import React, { useState, useEffect } from "react";
import ReviewAllocation from "../../components/Review/ReviewAllocation";
import ImpactSDG from "../../components/Review/ImpactSDG";
import ReviewFundData from "../../components/Review/ReviewFundData";
import StatementCheck from "../../components/Statement/StatementCheck";
import StatementCheckSDG from "../../components/Statement/StatementCheckSDG";
import StatementQuestions from "../../components/Statement/StatementQuestions";
import StatementABC from "../../components/Statement/StatementABC";
import StatementOrgQuestions from "../../components/Statement/StatementOrgQuestions";
import StatementMainImpactAreas from "./StatementMainImpactAreas";

const Matrix = (props) => {
    const fundData = props.fund;
    const orgData = props.org;

    function anyQuestions(qp) {
        return true;
        //return fundData.questions.filter((x) => x.questionpath === qp).length ? true : false;
    }

    function anyOrgQuestions(gr) {
        return true;

        // if (orgData.notations) {
        // 	return orgData.notations.filter((x) => x.group === gr).length ? true : false;
        // }

        // return false;
    }

    return (
        <div>
            <div>
                <div>
                    <div className="borderbox">
                        <h2>Key Information</h2>

                        {fundData && (
                            <ReviewFundData
                                fund={fundData}
                                id={fundData.id}
                                org={orgData}
                            />
                        )}
                    </div>

                    <div className="borderbox">
                        <h2>Classification</h2>

                        <StatementABC fund={fundData} />

                        {fundData && <ReviewAllocation fund={fundData} />}
                    </div>

                    <div className="borderbox">
                        <h2>SDG Alignment</h2>

                        <div className="certificats">
                            <p className="title">MAIN IMPACT AREAS</p>

                            {fundData && (
                                <StatementMainImpactAreas fund={fundData} />
                            )}
                        </div>
                        <div className="silverline" />
                        <br />
                        <div className="certificats">
                            <p className="title">IMPACT BY SDG</p>
                            <br />

                            {fundData && <ImpactSDG fund={fundData} />}
                        </div>

                        <div className="silverline" />

                        <div>
                            <div className="certificats">
                                <p className="title" style={{ color: "#FFA057" }}>ALIGNMENT WITH UNDP'S SDG IMPACT STANDARDS</p>
                                <div className="silverline" />

                                <p className="title">Strategy</p>

                                {fundData && (
                                    <StatementCheckSDG
                                        fund={fundData}
                                        questionpath="practice/sdgpurpose"
                                        infoboxes={{
                                            strat2:
                                                "This includes drawing on insights from stakeholders and reputable agencies to inform its approach.",
                                            strat3:
                                                "This includes ensuring the fund's intended impact (scale or depth) is commensurate with the size of the fund.",
                                            strat4:
                                                "This includes incorporating lessons from impact performance and responding to changes in the sustainable development context.",
                                        }}
                                    />
                                )}

                                <p
                                    className="title"
                                    style={{ paddingTop: "20px" }}
                                >
                                    Management Approach
                                </p>

                                {fundData && (
                                    <StatementCheckSDG
                                        fund={fundData}
                                        questionpath="practice/sdgmanagement"
                                        infoboxes={{
                                            man1:
                                                "This includes aligning incentives",
                                            man2:
                                                "This includes investor contributions the fund expects to make (through its own actions) to the impact performance of each investment.",
                                            man4:
                                                "This includes considering which metrics to use and how much data is sufficient to make a decision.",
                                        }}
                                    />
                                )}

                                <p
                                    className="title"
                                    style={{ paddingTop: "20px" }}
                                >
                                    Transparency
                                </p>

                                {fundData && (
                                    <StatementCheckSDG
                                        fund={fundData}
                                        questionpath="practice/sdgtransparency"
                                        infoboxes={{
                                            trans1:
                                                "This includes publicly disclosing responsible business policies.",
                                        }}
                                    />
                                )}

                                <p
                                    className="title"
                                    style={{ paddingTop: "20px" }}
                                >
                                    Governance
                                </p>

                                {fundData && (
                                    <StatementCheckSDG
                                        fund={fundData}
                                        questionpath="practice/sdggov"
                                        infoboxes={{
                                            gov1:
                                                "This includes recognising the implications of low accountability to those impacted and the need to act on their behalf in decisions.",
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="borderbox">
                <h2>Adherence with best-practices and guidance</h2>

                <div>
                    <div className="silverline" />
                    <div className="certificats">
                        <p className="title">Other Practices</p>
                        {fundData && (
                            <StatementCheck
                                fund={fundData}
                                questionpath="practice/partofpractice"
                            />
                        )}
                    </div>
                </div>

                {anyOrgQuestions("practicesperformance") ? (
                    <div>
                        <div className="silverline" />
                        <div className="certificats">
                            <p className="title">Organisational principles</p>
                            {props.org && (
                                <StatementOrgQuestions
                                    org={props.org}
                                    notationgroup="practicesperformance"
                                />
                            )}
                        </div>
                    </div>
                ) : null}

                {anyOrgQuestions("other") ? (
                    <div>
                        <div className="silverline" />
                        <div className="certificats">
                            <p className="title">
                                Organisational Accreditations and Ratings
                            </p>
                            {props.org && (
                                <StatementOrgQuestions
                                    org={props.org}
                                    notationgroup="other"
                                />
                            )}
                        </div>
                    </div>
                ) : null}

                {anyOrgQuestions("sectorinitiatives") ? (
                    <div>
                        <div className="silverline" />
                        <div className="certificats">
                            <p className="title">
                                Organisational Sector Commitments and Pledges
                            </p>
                            {props.org && (
                                <StatementOrgQuestions
                                    org={props.org}
                                    notationgroup="sectorinitiatives"
                                />
                            )}
                        </div>
                    </div>
                ) : null}

                {anyQuestions("practice/responsibleinvestment") ? (
                    <div>
                        <div className="silverline" />

                        <div className="certificats">
                            <p className="title">Fund Specific Principles</p>
                            {fundData && (
                                <StatementQuestions
                                    fund={fundData}
                                    questionpath="practice/responsibleinvestment"
                                />
                            )}
                        </div>
                    </div>
                ) : null}

                {anyQuestions("practice/responsibleinvestment") ? (
                    <div>
                        <div className="silverline" />

                        <div className="certificats">
                            <p className="title">
                                Other Methodologies and Guidance
                            </p>
                            {fundData && (
                                <StatementQuestions
                                    fund={fundData}
                                    questionpath="practice/guidance"
                                />
                            )}
                        </div>
                    </div>
                ) : null}

                {anyQuestions("practice/auditandassurance") ? (
                    <div>
                        <div className="silverline" />

                        <div className="certificats">
                            <p className="title">Assurance</p>
                            {fundData && (
                                <StatementQuestions
                                    fund={fundData}
                                    title="Assurance"
                                    questionpath="practice/auditandassurance"
                                />
                            )}
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="borderbox">
                <h2>Performance</h2>

                <div>
                    <div className="silverline" />
                    <div className="certificats">
                        <p className="title">Data providers</p>
                        {fundData && (
                            <StatementQuestions
                                fund={fundData}
                                questionpath="performance/performancesource"
                            />
                        )}
                    </div>
                </div>

                <div>
                    <div className="silverline" />
                    <div className="certificats">
                        <p className="title">Performance Data</p>
                        {fundData && (
                            <StatementQuestions
                                fund={fundData}
                                questionpath="performance/regulardisclosures"
                            />
                        )}
                    </div>
                </div>

                <div>
                    <div className="silverline" />
                    <div className="certificats">
                        <p className="title">Assurance</p>
                        {fundData && (
                            <StatementQuestions
                                fund={fundData}
                                questionpath="performance/auditperformance"
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="borderbox">
                <h2>Ratings and Affiliations</h2>

                <div className="silverline" />
                <div className="certificats">
                    <p className="title">RATINGS</p>
                    {fundData && (
                        <StatementQuestions
                            fund={fundData}
                            questionpath="ratings/providers"
                        />
                    )}
                </div>

                <div className="silverline" />
                <div className="certificats">
                    <p className="title">AFFILIATIONS</p>
                    {fundData && (
                        <StatementQuestions
                            fund={fundData}
                            questionpath="ratings/affiliated"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Matrix;
