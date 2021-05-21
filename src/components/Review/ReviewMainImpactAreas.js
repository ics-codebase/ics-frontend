import React from 'react';
import { Link } from 'react-router-dom';

function nameThatSDG(i) {
	var text = '';

	switch (i) {
		case '1':
			text = 'SDG1 - No Poverty';
			break;
		case '2':
			text = 'SDG2 - Zero Hunger';
			break;
		case '3':
			text = 'SDG3 - Good Health and Well-Being';
			break;
		case '4':
			text = 'SDG4 - Quality Education';
			break;
		case '5':
			text = 'SDG5 - Gender Equality';
			break;
		case '6':
			text = 'SDG6 - Clean Water and Sanitation';
			break;
		case '7':
			text = 'SDG7 - Affordable and Clean Energy';
			break;
		case '8':
			text = 'SDG8 - Decent Work and Economic Growth';
			break;
		case '9':
			text = 'SDG9 - Industry, Innovation and Infrastructure';
			break;
		case '10':
			text = 'SDG10 - Reduced Inequalities';
			break;
		case '11':
			text = 'SDG11 - Sustainable Cities';
			break;
		case '12':
			text = 'SDG12 - Responsible Consumption and Production';
			break;
		case '13':
			text = 'SDG13 - Climate Action';
			break;
		case '14':
			text = 'SDG14 - Life Below Water';
			break;
		case '15':
			text = 'SDG15 - Life on Land';
			break;
		case '16':
			text = 'SDG16 - Peace, Justice and Strong Institutions';
			break;
		case 's17':
			text = 'SDG17 - Partnerships for the Goals';
			break;
		default:
			text = 'None selected';
	}

	return text;
}

const ReviewMainImpactAreas = (props) => {
	const fundData = props.fund;
    const areas = fundData.impactsdg.focusareas;
    

	const sdg1 = nameThatSDG(areas.primary);
	const sdg2 = nameThatSDG(areas.secondary);
	const sdg3 = nameThatSDG(areas.tertiary);

	return (
		<div style={{'font-style':'italic'}}>
			<div className="ppfororange">
				<div className="orangedivcb">
					<div className='box'>
                        <p className="tit" style={{'float':'left'}}>Primary impact area:</p>
                        <p className="tit" style={{'text-align':'right'}}>{sdg1}</p>
                    </div>
					<div className='box'>
                        <p className="tit" style={{'float':'left'}}>Secondary impact area:</p>
                        <p className="tit" style={{'text-align':'right'}}>{sdg2}</p>
                    </div>
					<div className='box'>
                        <p className="tit" style={{'float':'left'}}>Tertiary impact area:</p>
                        <p className="tit" style={{'text-align':'right'}}>{sdg3}</p>
                    </div>
				</div>
			</div>
		</div>
	);
};

export default ReviewMainImpactAreas;
