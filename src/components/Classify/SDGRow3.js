import React, { Component, useState } from "react";
import { withRouter } from "react-router";
import { useHistory, useParams } from "react-router-dom";
import { FundStore } from "../../store/FundStore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import * as Yup from "yup";
import { useStores } from "../../hooks/use-stores";
import fundService from "../../services/fund";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const Container = styled.div`
    display: flex;
`;

const SDGbox = styled.div`
    display: flex;
    width: 118px;
    align-items: center;
    justify-content: center;
`;

const SDGGrid = (props) => {
    var fund = props.fund;

    const sdgkey = "sdg-" + props.sdg;

    const initialData = [
        {
            id: "x0",
            content: "X",
        },
        {
            id: "x1",
            content: "X",
        },
        {
            id: "x2",
            content: "X",
        },
        {
            id: "x3",
            content: "X",
        },
        {
            id: "x4",
            content: "X",
        },
    ];

    if (!fund.impactsdg.scoring) fund.impactsdg.scoring = [];

    //update initial data based on existing fund imacptsdg scoring
    const savedsdg = fund.impactsdg.scoring.find((x) => x.id === sdgkey);
    if (savedsdg) {
        initialData.splice(savedsdg.position, 1, {
            id: sdgkey,
            content: props.sdg,
        });
    } else {
        //insert into starting position in initial data
        initialData.splice(1, 1, { id: sdgkey, content: props.sdg });
    }

    const [gridState, setGridState] = useState(initialData);

    const onDragEnd = (result) => {
        var doit = true;

        if (props.disableC && result.destination.index === 4) doit = false;
        if (props.disableB && (result.destination.index === 3 || result.destination.index === 4)) doit = false;

        if (doit) {
            //reorder
            if (!result.destination || result.destination === result.source) {
                return;
            }
            const items = reorder(
                gridState,
                result.source.index,
                result.destination.index
            );

            //save to fund
            if (fund.impactsdg) {
                if (!fund.impactsdg.scoring) {
                    fund.impactsdg.scoring = [];
                }
            }

            const index = fund.impactsdg.scoring.findIndex(
                (x) => x.id === result.draggableId
            );
            if (index > -1) {
                fund.impactsdg.scoring.splice(index, 1);
            }

            fund.impactsdg.scoring.push({
                id: result.draggableId,
                position: result.destination.index,
            });
            console.log(result.destination.index);

            //update state
            setGridState(items);
        }
    };

    return (
        <div className="rowstable">
            <div className="leftarrowsrow">
                <a href="">
                    <img
                        style={{ opacity: "0.1" }}
                        src="/assets/img/leftarrow.png"
                        className="imgoncenter"
                        alt=""
                    />
                </a>
            </div>
            <div className="harmrow" />
            <div className="impactrow" />
            <div className="first" />
            <div className="nth2" 
                style={props.disableB ? { background: "#f1f1f1" } : null}			
			/>
            <div
                className="nth3"
                style={props.disableB || props.disableC ? { background: "#f1f1f1" } : null}
            />
            {/* <div className="nth3" style={props.disableC ? {background : "repeating-linear-gradient(45deg,lightgray,lightgray 10px, gray 10px, gray 20px)"} : null} /> */}
            <div className="rightarrowrow">
                <a href="">
                    <img
                        style={{ opacity: "0.1" }}
                        src="/assets/img/rightarrow.png"
                        className="imgoncenter"
                        alt=""
                    />
                </a>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <Container
                            className="rowforslider"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {gridState.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <SDGbox
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <img
                                                alt={"SDG-" + item.content}
                                                src={
                                                    "/assets/img/SDG" +
                                                    item.content +
                                                    ".png"
                                                }
                                            />
                                        </SDGbox>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
            </DragDropContext>

            <div className="forborder1" />
            <div className="forborder2" />
            <div className="forborder3" />
            <div className="forborder4" />
            <div className="forborder5" />
            <div className="forborder6" />
        </div>
    );
};

export default withRouter(SDGGrid);
