import React, { Component } from "react";
import { withRouter } from "react-router";
import { useHistory, useParams } from "react-router-dom";
import DetailsQuestion from "../../components/Classify/DetailsQuestion";
import { FundStore } from "../../store/FundStore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useStores } from "../../hooks/use-stores";
import ScrollToTop from "../../components/Router/ScrollToTop";
import Infobox from "../../components/UI/Infobox";
import ModalInfo from "../../components/UI/ModalInfo";
import * as QueryString from "query-string";
import Steps from "../../components/Classify/Steps";

const InvestorContribution = (props) => {
    let history = useHistory();
    let { id } = useParams();
    const { fundStore } = useStores();
    var fund = fundStore.funds.find((x) => x._id === id);

    const handleSubmit = (values) => {
        try {
            fund.investor = values.investor;

            if (
                fund.investor.length > 0 &&
                !fund.investor.includes("impactmatterssignal")
            ) {
                fund.investor.push("impactmatterssignal");
            }

            fundStore.saveFund(fund);
        } catch (err) {
            console.log(err);
        }

        const params = QueryString.parse(props.location.search);
        if (params.review) {
            history.push("/classify/" + id + "/review");
        } else {
            history.push("/classify/" + id + "/allocation");
        }
    };

    const validation = Yup.object().shape({
        investor: Yup.mixed().test(
            "test-name",
            "Must contain at least Signal that impact matters",
            function (value) {
                if (!value.includes("impactmatterssignal"))
                    return this.createError({ message: "Signal" });
                if (value.includes("flexibility")) {
                    return value.includes("grow")
                        ? true
                        : this.createError({
                              message:
                                  "If flexibility is selected, then grow markets should also be selected.",
                          });
                }

                return true;
            }
        ),
    });

    function goBack() {
        history.push("/classify/" + id + "/impactsdg");
    }

    return (
        <div>
            <ScrollToTop />
            <div className="container-fluid step1_container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Steps lineat="investor" />

                            <h1 className="step5h1">
                                Step 5: Investor contribution
                            </h1>
                            <p className="desc">
                                The impact of an investment is not just the
                                impact of the underlying assets. Investors use
                                four strategies to contribute to impact, often
                                in combination. Learn about each investor
                                contribution strategy and select all that apply.
                            </p>

                            <ModalInfo url="https://james536236.typeform.com/to/DUTVeX" />

                            <Formik
                                initialValues={{
                                    investor: fund.investor,
                                }}
                                validationSchema={validation}
                                onSubmit={(values) => {
                                    handleSubmit(values);
                                }}
                            >
                                {({
                                    errors,
                                    touched,
                                    handleChange,
                                    setFieldValue,
                                }) => (
                                    <Form>
                                        <div className="maxwidth_checboxes">
                                            <label className="container-checkbox">
                                                Signal that impact matters{" "}
                                                <Infobox
                                                    key="investor_signal"
                                                    title=""
                                                    info="Choosing not to invest in, or to favour, certain investments such that, if all investors did the same, it would ultimately lead to a ‘pricing in’ of social and environmental effects by the capital markets. Often referred to as values alignment, this strategy expresses the investors’ values and is an important baseline. But alone, it is not likely to advance progress on societal issues when compared to other forms of contribution."
                                                />
                                                <Field
                                                    type="checkbox"
                                                    name="investor"
                                                    value="impactmatterssignal"
                                                    className="showdownifchecked"
                                                />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-checkbox">
                                                Engage actively{" "}
                                                <Infobox
                                                    key="investor_engage"
                                                    title=""
                                                    info="Using expertise, networks and influence to improve the impact of businesses. Engagement can include a wide spectrum of approaches - dialogue with companies, creation of industry standards, taking board seats and providing hands-on management support (as often seen in private equity)."
                                                />
                                                <Field
                                                    type="checkbox"
                                                    name="investor"
                                                    value="engage"
                                                    className="showdownifchecked"
                                                />
                                                <span className="checkmark" />
                                            </label>
                                            <label className="container-checkbox">
                                                Grow new/undersupplied capital
                                                markets{" "}
                                                <Infobox
                                                    key="investor_grow"
                                                    title=""
                                                    info="Anchor or participate in new or previously overlooked opportunities. This may involve more complex or less liquid investments, or investments in which some perceive risk to be disproportionate to return."
                                                />
                                                <Field
                                                    type="checkbox"
                                                    name="investor"
                                                    value="grow"
                                                    className="showdownifchecked"
                                                />
                                                <span className="checkmark" />
                                            </label>
                                            <label
                                                className="container-checkbox"
                                                style={{ width: "400px" }}
                                            >
                                                Provide flexibility on
                                                risk-adjusted financial return{" "}
                                                <Infobox
                                                    key="investor_flexs"
                                                    title=""
                                                    info="Accept lower risk-adjusted financial return to generate certain kinds of impact."
                                                />
                                                <Field
                                                    type="checkbox"
                                                    name="investor"
                                                    value="flexibility"
                                                    className="showdownifchecked"
                                                />
                                                <span className="checkmark" />
                                            </label>
                                        </div>

                                        <div>
                                            {errors.investor &&
                                            touched.investor ? (
                                                <p className="errmsg">
                                                    {errors.investor}
                                                </p>
                                            ) : null}
                                        </div>

                                        <div className="buttonsbtn">
                                            <div className="row">
                                                <div className="col-6 leftside">
                                                    <button onClick={goBack}>
                                                        <span>Back</span>
                                                    </button>
                                                </div>
                                                <div className="col-6 rightside">
                                                    <button type="submit">
                                                        <span>
                                                            Save and Continue
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(InvestorContribution);
