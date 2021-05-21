import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../hooks/use-stores';
import NotationModal from './NotationModal';
import organisationService from '../../services/organisation';
import { truncate } from 'lodash';

function cleanName(n) {
	return n.replace(/__/g, ' ');
}

class NotationList extends React.Component {
	// constructor(props) {
	// 	super(props);
	// }

	showNotationModal = () => {
		this.props.openmodal();
	};

	render() {
		return (
			<div>
				{this.props.hasNotations ? (
					<div className="ifyes">
						<div className="addform">
							<div>
								<p className="itemadded">
									Name{' '}
									<span className="rights">
										<a href="">LINK/SCORE</a>
									</span>
								</p>

								{this.props.store.organisation.notations
									.filter((a) => a.group === this.props.notationgroup)
									.map((i) => (
										<p className="itemadded scoreadded" key={i.name}>
											{cleanName(i.name)}
											<span className="rights">
												{i.score ? <span className="score">Score: {i.score}</span> : null}

												{i.other ? <div style={{display: "table-cell", 'font-size': '13px'}}>{truncate(i.other,{'length':40})}</div> : null}

												<a style={{ display: 'table-cell' }} href={i.link} target="_blank">
													{truncate(i.link, { length: 40 })}
												</a>
											</span>
										</p>
									))}

								<button type="button" className="additembtn" onClick={this.showNotationModal}>
									+ Add Item / Manage List
								</button>
							</div>
						</div>
					</div>
				) : (
					''
				)}
			</div>
		);
	}
}

const NotationSection = observer((props) => {
	const { organisationStore } = useStores();

	function greaterThanZeroAndNotUndefined(obj) {
		if (obj === undefined) {
			return false;
		} else {
			return obj.length > 0 ? true : false;
		}
	}

	const hasNotations = greaterThanZeroAndNotUndefined(
		organisationStore.organisation.notations.filter((a) => a.group === props.notationgroup)
	);

	const [ showAddForm, setShowAddForm ] = React.useState(false);

	const makeAddFormVisible = (e) => {
		setShowAddForm(true);
	};

	const makeAddFormInvisible = (e) => { 
		setShowAddForm(false);
	};

	return (
		<div>
			<p className="desc">{props.title}</p>

			<div className="radiodiv">
				<label className="container-radio">
					<input
						type="radio"
						name={props.notationgroup + '_cb'}
						value="no"
						checked={!hasNotations}
						onClick={makeAddFormInvisible}
						readOnly
					/>{' '}
					No, it does not
					<span className="checkmark" />
				</label>
				<label className="container-radio yesradio">
					<input
						type="radio"
						name={props.notationgroup + '_cb'}
						value="yes"
						checked={hasNotations}
						onClick={makeAddFormVisible}
						readOnly
					/>{' '}
					Yes, it does
					<span className="checkmark" />
				</label>

				<NotationList
					notationgroup={props.notationgroup}
					store={organisationStore}
					hasNotations={hasNotations}
					notations={props.notations}
					openmodal={makeAddFormVisible}
				/>
			</div>

			<NotationModal
				notationgroup={props.notationgroup}
				title={props.title}
				questions={props.questions}
				show={showAddForm}
				closemodal={makeAddFormInvisible}
			/>
		</div>
	);
});

export default NotationSection;
