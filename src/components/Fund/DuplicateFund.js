// Render Prop
import React, { useState, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { FaRegClone } from "react-icons/fa";
import fundService from "../../services/fund";
import { useStores } from "../../hooks/use-stores";

const cleanButton = {
    background: "none",
    color: "inherit",
    border: "none",
    padding: "0",
    marginTop: "20px",
    font: "inherit",
    cursor: "pointer",
    outline: "inherit",
    textAlign: "left",
};

const DuplicateFund = (props) => {
    const { fundStore } = useStores();
    let { id } = useParams();
    const history = useHistory();

    const handleClone = () => {
        //call fund service to duplicate
        fundService.duplicateFund(id);
        fundStore.refreshFromArchive().then(() => {
            history.push("/organisation/securities");
        });
    };

    return (
        <div>
            <h2>Fund Administration Functions</h2>
            <button style={cleanButton} onClick={handleClone}>
                <FaRegClone /> Clone this Fund
            </button>
        </div>
    );
};

export default DuplicateFund;
