import React, { useState, useEffect } from "react";
import { useStores } from "../../hooks/use-stores";
import { withRouter } from "react-router";
import { useHistory, useParams, Link } from "react-router-dom";
import ScrollToTop from "../../components/Router/ScrollToTop";
import Matrix from "../../components/Statement/Matrix";
import axios from "axios";

import { FaFileCsv } from "react-icons/fa";
import CsvDownloader from "react-csv-downloader";
import { CSVLink, CSVDownload } from "react-csv";
import ModalOk from "../../components/UI/ModalOk";

const Statement = (props) => {
    let history = useHistory();
    let { id } = useParams();
    const { userStore, fundStore } = useStores();
    const loggedIn = userStore.isAuthenticated;
    const isadmin = userStore.user.role == "admin" ? true : false;

    const [show, setShow] = useState(false);

    console.log("userid: " + userStore.user._id);
    //   console.log("fundid: " + fundStore.fund.user)

    const [fundData, setFundData] = useState();
    const [orgData, setOrgData] = useState({ org: {} });

    const url = process.env.REACT_APP_API_URI + "/fund/public/" + id;

    async function fetchData() {
        const result = await axios(url);
        setFundData({ fund: result.data });

        const orgid = result.data.organisation;
        const orgurl =
            process.env.REACT_APP_API_URI + "/organisation/public/" + orgid;
        const orgResult = await axios(orgurl);
        setOrgData({ org: orgResult.data });

        console.log("funduser:" + result.data.user);
    }

    useEffect(() => {
        fetchData();
    }, []);

    function getModalResult() {
        setShow(true);
    }

    function sendPublishRequest() {
        var fund = fundData.fund;
        fund.published = "approvalrequest";
        const r = fundStore.saveFund(fund);

        history.push("/classify/finished");
    }

    function doNotPublish() {
        var fund = fundData.fund;
        fund.published = "unpublished";
        const r = fundStore.saveFund(fund);

        history.push("/classify/finishednotpublished/" + id);
    }

    const FundCSV = (props) => {
        const csvButton = {
            background: "none",
            color: "inherit",
            border: "none",
            padding: "0",
            font: "inherit",
            cursor: "pointer",
            outline: "inherit",
        };

        return (
            <div>
                {isadmin ? (
                    <CSVLink data={[props.fund]}>DOWNLOAD CSV HERE</CSVLink>
                ) : null}
            </div>
        );
    };

    return (
        <div>
            <ScrollToTop />

            <ModalOk
                title="Send statement for approval?"
                message="Clicking the submit button below will finalise your statement
                 and send it for approval to be published. If you do not want to do that 
                 immediatley, please select Do Not Submit below. Otherwise select Submit."
                buttontextok="Submit"
                buttontextcancel="Do not submit"
                show={show}
                handleOk={sendPublishRequest}
                handleCancel={doNotPublish}
            />

            {fundData ? (
                <div className="container-fluid step1_container">
                    <div className="container">
                        <div className="row">
                            <div
                                className="col-md-12"
                                style={{ paddingTop: "30px" }}
                            >
                                <h1>Classification Statement</h1>

                                {fundData.fund && (
                                    <Matrix
                                        fund={fundData.fund}
                                        org={orgData.org}
                                    />
                                )}

                                <br />
                                <br />
                                <div style={{ marginTop: "100px" }}>
                                    - For Financial Professional Use Only -
                                </div>

                                <div
                                    style={{
                                        marginBottom: "20px",
                                        marginTop: "20px",
                                        color: "grey",
                                    }}
                                >
                                    Disclaimer: The classification statements
                                    are for information purposes only and do not
                                    in any way amount to financial, investment,
                                    legal or tax advice or any other investment
                                    engagement, whether through use of the
                                    classification statements, or otherwise,
                                    whether by you or by anyone else on your
                                    behalf. You should take professional
                                    financial or investment advice in connection
                                    with, or independently research and verify,
                                    any information contained in the
                                    classification statements or otherwise on
                                    our website that you wish to rely upon,
                                    whether for the purpose of making an
                                    investment decision, or otherwise.
                                </div>

                                <div>
                                    <FundCSV fund={fundData.fund} />
                                </div>

                                <div className="buttonsbtn">
                                    {fundData.fund.user ==
                                    userStore.user._id ? (
                                        <div className="row">
                                            <div className="col-6 leftside">
                                                <div className="paddingdiv">
                                                    <button
                                                        onClick={doNotPublish}
                                                    >
                                                        <span>
                                                           INTERNAL STATEMENT REVIEW
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="col-6 rightside">
                                                <button
                                                    onClick={getModalResult}
                                                >
                                                    <span>
                                                        PUBLISH THIS STATEMENT
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        padding: "50px",
                        margin: "50px",
                        border: "solid 1px lightgray",
                    }}
                >
                    Loading ... please wait ...
                </div>
            )}
        </div>
    );
};

export default Statement;
