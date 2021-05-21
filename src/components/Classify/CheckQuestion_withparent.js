import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../hooks/use-stores';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SubAnswer = (props) => {
	const [ optionResults, setOptionResults ] = useState([]);

	//get fund
	var fund = props.fund;
	const peo_text = fund.practice_exclusions_other;
	var question = fund.questions.find((x) => x.questionpath === props.questionpath && x.id === props.parentquestion);

	//create options

	useEffect(
		() => {
			var results = [];

			//determines whether to show checkbox
			const getExistenceOfAnswer = (qid) => {
				if (question) {
					var subanswers = question.subanswers;

					if (subanswers) {
						if (subanswers.indexOf(qid) > -1) return true;
					}
				}
				return false;
			};

			props.options.forEach(function(item) {
				const opt = { info: item, checked: getExistenceOfAnswer(item) };
				results.push(opt);
			});

			setOptionResults(results);
		},
		[ props.options, question ]
	);

	//when checkbox is clicked
	const handleChange = (e) => {
		//make sure parent check is on
		props.handleToggleParentOn(document.getElementsByName(props.parentid));

		//get question from fund
		var q = fund.questions.find((x) => x.questionpath === props.questionpath && x.id === props.parentquestion);

		//do thing
		if (q) {
			if (!q.subanswers) {
				q.subanswers = [];
			}

			if (e.target.checked) {
				q.subanswers.push(e.target.value);
			} else {
				q.subanswers.splice(q.subanswers.indexOf(e.target.value), 1);
			}
		}
	};

	//when textbox is clicked
	const handleTextBoxChange = (e) => {
		fund.practice_exclusions_other = e.target.value;
	};

	return (
		<div className="ifyesdiv">
			<p className="titleify" dangerouslySetInnerHTML={{ __html: props.instructions }} />

			<div className="row rowofcs" id={'subanswercontainer_' + props.questionpath.replace('/', '_')}>
				{optionResults.map((i) => (
					<div className="col-md-6" key={i.info}>
						<label className="container-checkbox">
							<div dangerouslySetInnerHTML={{ __html: i.info }} />
							<input
								type="checkbox"
								name={i.info}
								value={i.info}
								defaultChecked={i.checked}
								onChange={handleChange}
							/>
							<span className="checkmark" />
						</label>
					</div>
				))}
			</div>

			<div className="row rowofcs" style={{ paddingLeft: '15px' }}>
				Please specify 'Other':
			</div>
			<div className="row rowofcs">
				<div className="col-md-12">
					<input
						type="text"
						name="practice_exclusions_other"
						defaultValue={fund.practice_exclusions_other}
						onChange={handleTextBoxChange}
					/>
				</div>
			</div>
		</div>
	);
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------

const CheckQuestion = observer((props) => {
	const { fundStore } = useStores();
	let { id } = useParams();
	var fund = fundStore.funds.find((x) => x._id === props.fundid);
	const [ fakeUpdate, setFakeUpdate ] = useState(1);

	//gets wheteher someone has given answers
	let hasAnswers = false;
	if (fund.questions) {
		if (fund.questions.find((x) => x.questionpath === props.questionpath)) {
			hasAnswers = fundStore.funds
				.find((x) => x._id === id)
				.questions.filter((x) => x.questionpath === props.questionpath).length;
		}
	}

	const storeCheckboxResult = (questionpath, name, answer, currentcheckstatus) => {
		if (currentcheckstatus) {
			//add if not there
			fund.questions.push({
				questionpath: questionpath,
				id: name,
				answer: answer
			});
		} else {
			//remove fund question answer if already exist
			const q = fund.questions.find((x) => x.questionpath === questionpath && x.id === name);
			fund.questions.splice(fund.questions.indexOf(q), 1);
		}

	};

	function uncheckAll(divid) {
		var checks = document.querySelectorAll('#' + divid + ' input[type="checkbox"]');

		for(var i =0; i< checks.length;i++){
			var check = checks[i];
			if(!check.disabled){
				check.checked = false;
			}
		}
	}

	function checkAll(divid) {
		var checks = document.querySelectorAll('#' + divid + ' input[type="checkbox"]');

		for(var i =0; i< checks.length;i++){
			var check = checks[i];
			if(check.disabled){
				check.checked = true;
			}
		}
	}


	const handleCheckboxChange = (e) => {
		//save change
		storeCheckboxResult(props.questionpath, e.target.name, e.target.value, e.target.checked);

		//untick other checkboxes in question

		if (e.target.checked === false) {
			const nodeid = 'subanswercontainer_' + props.questionpath.replace('/', '_');
			
			uncheckAll(nodeid)
		}
	};

	const getExistenceOfAnswer = (qid) => {
		var fund = fundStore.funds.find((x) => x._id === props.fundid);

		if (fund.questions) {
			const qs = fund.questions.find((x) => x.questionpath === props.questionpath && x.id === qid);
			if (qs) return true;
		}

		return false;
	};

	const setUpdate = () => {
		setFakeUpdate(2);
	};

	const toggleParentOn = (cb) => {
		if (!cb[0].checked) {
			cb[0].checked = true;
			storeCheckboxResult(props.questionpath, cb[0].name, cb[0].value, cb[0].checked);
		}
	};

	return (
		<div>
			<p className="desc2">{props.title}</p>

			<div className="checkboxdiv">
				{props.questions.map((i) => (
					<div className="boxs lablechecked" key={i.id}>
						<label className="container-checkbox">
							<div dangerouslySetInnerHTML={{ __html: i.answer }} />
							<input
								type="checkbox"
								className="showdownifchecked"
								name={i.id}
								value={i.answer}
								defaultChecked={getExistenceOfAnswer(i.id)}
								onChange={handleCheckboxChange}
							/>
							<span className="checkmark" />
						</label>

						{i.subanswers ? (
							<SubAnswer
								forceUpdate={setUpdate}
								fundid={props.fundid}
								fund={fund}
								questionpath={props.questionpath}
								parentquestion={i.id}
								instructions={i.subanswerinstructions}
								options={i.subanswers}
								parentid={i.id}
								handleToggleParentOn={toggleParentOn}
							/>
						) : null}
					</div>
				))}
			</div>
		</div>
	);
});

export default CheckQuestion;
