import React from 'react';
import PracticesModal from './PracticesModal';
import { observer } from 'mobx-react';
import organisationService from '../../services/organisation';
import { useStores } from '../../hooks/use-stores';
import { truncate } from 'lodash';

class PracticesListItems extends React.Component {
	render() { 
		return this.props.store.organisation.practices.map((i) => (
			<p className="itemadded scoreadded" key={i._id}>
				{i.name}
				<span className="rights">
					<span className="score">Score: {i.score}</span>
					<a style={{display: "table-cell"}} href={i.link} target="_blank">{truncate(i.link,{'length':40})}</a>

				</span>
			</p>
		));
	}
}

const PracticesListAddForm = observer((props) => {
	const [ showModalPracticesEntry, setShowModalPracticesEntry ] = React.useState(false);
	const { organisationStore } = useStores();

	const closePracticesModal = (e) => {
		setShowModalPracticesEntry(false);
	};

	const showPracticesModal = (e) => {
		setShowModalPracticesEntry(true);
	};

	return (
		<div>
			<PracticesModal showpractices={showModalPracticesEntry} closemodal={closePracticesModal} />

			<div className="ifyes">
				<div className="addform">
					{props.hasPractices ? (
						<div>
							<p className="itemadded">
								Name{' '}
								<span className="rights">
									<a href="">LINK/SCORE</a>
								</span>
							</p>
							<PracticesListItems store={organisationStore} />
						</div>
					) : (
						<div className="noitems">
							'No items added. Please add the accreditations and market initiatives.'
						</div>
					)}

					<button className="additembtn" onClick={showPracticesModal}>
						+ Add Item / Manage List
					</button>
				</div>
			</div>
		</div>
	);
});

const PracticesList = observer((props) => {
	const listItems = props.practicesList.map((d) => <li key={d.name}>{d.name}</li>);

	const [ showAddForm, setShowAddForm ] = React.useState(props.practicesList.length > 0 ? true : false);

	const makeAddFormVisible = (e) => {
		setShowAddForm(true);
	};

	const makeAddFormInvisible = (e) => {
		setShowAddForm(false);
	};

	return (
		<div>
			<h2>Organisational practices and performance</h2>
			<p className="desc">Does your organisation adhere to any market principles?</p>

			<div className="radiodiv">
				<label className="container-radio">
					<input
						type="radio"
						name="principles"
						value="false"
						defaultChecked={!props.hasPractices}
						onClick={makeAddFormInvisible}
					/>{' '}
					No, it does not
					<span className="checkmark" />
				</label>
				<label className="container-radio yesradio">
					<input
						type="radio"
						name="principles"
						value="True"
						defaultChecked={props.hasPractices}
						onClick={makeAddFormVisible}
					/>{' '}
					Yes, it does
					<span className="checkmark" />
				</label>

				{showAddForm ? (
					<PracticesListAddForm practicesListItems={props.practicesList} hasPractices={props.hasPractices} />
				) : (
					''
				)}
			</div>
		</div>
	);
});

export default PracticesList;
