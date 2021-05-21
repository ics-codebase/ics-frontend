import React from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';

const Infobox = (props) => {
	return (
		<div style={{ display: 'inline' }}>
			<OverlayTrigger
				trigger="hover"
				key="right"
				placement={props.direction ? props.direction : 'right'}
				overlay={
					<Popover>
						<Popover.Content>
							{props.title ? <b>{props.title} </b> : null}
							<div class="infobox" dangerouslySetInnerHTML={ {__html: props.info }} /> 
							{props.secondinfo ? <div><br/><br/></div> : null}
							{props.secondtitle ? <b>{props.secondtitle} </b> : null}
							{props.secondinfo ? props.secondinfo : null}
						</Popover.Content>
					</Popover>
				}
			>
				<img src="/assets/img/infobox.png" style={{'cursor': 'help'}} alt="" data-tip="hello" style={{ margin: '0 0 4px 0' }} />
			</OverlayTrigger>
		</div>
	);
};

export default Infobox;
