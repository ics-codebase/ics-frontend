// Render Prop
import React, { useEffect, useState } from 'react';
import { FileDrop } from 'react-file-drop';
import organisationService from '../../services/organisation';

const uploadboxstyle = {
	border: '1px solid black',
	width: '600',
	color: 'black',
	padding: '20px',
	cursor: 'pointer'
};

const uploadboxstyleover = {
	border: '1px solid black',
	width: '600',
	color: 'black',
	padding: '20px',
	cursor: 'pointer',
	backgroundColor: 'blue'
};



const OrgImageUpload = (props) => {
	const [ org, setOrg ] = useState({});
	const [ avatar, setAvatar ] = useState();

	useEffect(() => {
		organisationService.getOrganisationSync().then((res) => {
			setOrg(res.data);
		});
    }, []);

    
    function Dropped(org, file, event) {

        organisationService.saveOrganisationAvatar(org._id, file[0]).then((res) => {
            setAvatar(res.data)
        });
    }

	return (
		<div style={{ marginBottom: '50px' }}>
			<h2>Company Logo</h2>
			<p className="desc">Please upload your company logo if you have one</p>

            <div>
                {avatar ? <img src={avatar} /> : "No image uploaded"}
            </div>

			<div style={uploadboxstyle}>
				<FileDrop
					// onDragOver={(event) => console.log('onDragOver', 'over')}
					// onDragLeave={(event) => console.log('onDragLeave', 'leave')}
					onDrop={(files, event) => Dropped(org, files, event)}
				>
					Drop your Company Logo here
				</FileDrop>
			</div>
		</div>
	);
};

export default OrgImageUpload;
