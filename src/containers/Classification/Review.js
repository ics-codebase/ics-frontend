import React, { Component, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useHistory, useParams } from "react-router-dom";
import DetailsQuestion from "../../components/Classify/DetailsQuestion";
import { FundStore } from "../../store/FundStore";
import ScrollToTop from "../../components/Router/ScrollToTop";
import ReviewForm from "../../components/Classify/ReviewForm";
import { useStores } from "../../hooks/use-stores";
import Steps from "../../components/Classify/Steps";
import ModalOk from "../../components/UI/ModalOk";

const Review = (props) => {
    const [fundData, setFundData] = useState({});

    let history = useHistory();
    let { id } = useParams();

    const { fundStore, organisationStore } = useStores();
    const org = organisationStore;

    const fund = fundStore.funds.find((x) => x._id === id);

    function saveAndContinue() {
        // fund.published = "published";
        // const r = fundStore.saveFund(fund);

        history.push("/statement/" + id);
    }

    function goBack() {
        history.goBack();
    }

    return (
        <div>
            <ScrollToTop />

            <div className="container-fluid step1_container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Steps lineat="review" />

                            <h1>Step 8: Review</h1>
                            <p className="desc">
                                Please review the fund’s information before
                                finishing the classification process.
                            </p>

                            {fund && org ? (
                                <ReviewForm fund={fund} org={org} />
                            ) : null}

                            <div className="buttonsbtn">
                                <div className="row">
                                    <div className="col-6 leftside">
                                        <button onClick={goBack}>
                                            <span>Back</span>
                                        </button>
                                    </div>
                                    <div className="col-6 rightside">
                                        <button onClick={saveAndContinue}>
                                            <span>NEXT</span>
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

export default withRouter(Review);
