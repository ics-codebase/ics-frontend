import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../hooks/use-stores';
import DetailsQuestionModal from './DetailsQuestionModal';
import fundStore from '../../services/fund';
import { truncate } from 'lodash';

import { useHistory, useParams } from 'react-router-dom';

class DetailsQuestionList extends React.Component {
	showDetailsQuestionModal = () => {
		this.props.openmodal();
	};

	render() {
		return (
			<div>
				{this.props.fund.questions.filter((a) => a.questionpath === this.props.questionpath)[0] ? (
					<div className="ifyes">
						<div className="addform">
							<div>
								<p className="itemadded">
									Name{' '}
									<span className="rights">
										<a href="">{this.props.detailtitle}</a>
									</span>
								</p>

								{this.props.fund.questions
									.filter((a) => a.questionpath === this.props.questionpath)
									.map((i) => (
										<p className="itemadded scoreadded" key={i.id + i.score + i.link}>
											{i.answer}
											<span className="rights">
												{i.score ? <span className="score">Score: {i.score}</span> : null}
												{i.link ? <a style={{display: "table-cell"}} href={i.link} target="_blank">{truncate(i.link,{'length':40})}</a> : null}
												{i.other ? <div style={{display: "table-cell", 'font-size': '13px'}}>{truncate(i.other,{'length':40})}</div> : null}
											</span>
										</p>
									))}

								<button className="additembtn" onClick={this.showDetailsQuestionModal}>
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

const DetailsQuestion = observer((props) => {
	const { fundStore } = useStores();
	const id = props.fundid;
	const fund = props.thefund;
	const [ showAddForm, setShowAddForm ] = React.useState(false);

	let hasAnswers = false;

	if (fund.questions) {
		if (fund.questions.find((x) => x.questionpath === props.questionpath)) {
			hasAnswers = fundStore.funds
				.find((x) => x._id === id)
				.questions.filter((x) => x.questionpath === props.questionpath).length;
		}
	}

	const makeAddFormVisible = (e) => {
		setShowAddForm(true);
	};

	const makeAddFormInvisible = (e) => {
		setShowAddForm(false);
	};

	return (
		<div>
			<p className="desc2"><div dangerouslySetInnerHTML={{ __html: props.title }} /></p>

			<div className="radiodiv">
				<label className="container-radio">
					<input
						type="radio"
						name={props.questionpath + '_cb'}
						value="no"
						checked={!hasAnswers}
						onClick={makeAddFormInvisible}
						readOnly
					/>{' '}
					{props.notitle}
					<span className="checkmark" />
				</label>
				<label className="container-radio yesradio">
					<input
						type="radio"
						name={props.questionpath + '_cb'}
						value="yes"
						checked={hasAnswers}
						onClick={makeAddFormVisible}
						readOnly
					/>{' '}
					{props.yestitle}
					<span className="checkmark" />
				</label>

				<DetailsQuestionList
					fundid={id}
					fund={fund}
					questionpath={props.questionpath}
					store={fundStore}
					detailtitle={props.detailtitle}
					openmodal={makeAddFormVisible}
				/>
			</div>

			<DetailsQuestionModal
				questionpath={props.questionpath}
				fund={fund}
				title={props.title}
				questions={props.questions}
				show={showAddForm}
				closemodal={makeAddFormInvisible}
			/>
		</div>
	);
});

export default DetailsQuestion;
