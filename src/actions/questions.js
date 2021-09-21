import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const GET_QUESTION = 'GET_QUESTION';
export const SET_QUESTION = 'ADD_QUESTION';
export const SET_ANSWER = 'ADD_ANSWER';

export function receiveQuestions(questions) {
	return {
		type: GET_QUESTION,
		questions
	};
}

function addQuestion(question) {
	return {
		type: SET_QUESTION,
		question
	};
}

function addAnswer({ qid, answer, authedUser }) {
	return {
		type: SET_ANSWER,
		answerInfo: {
			qid,
			answer,
			authedUser
		}
	};
}

//async action creators
export function handleAddQuestion(optionOne, optionTwo) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		dispatch(showLoading());

		return saveQuestion({
			optionOneText: optionOne,
			optionTwoText: optionTwo,
			author: authedUser
		})
			.then((question) => dispatch(addQuestion(question)))
			.then(() => dispatch(hideLoading()));
	};
}

export function handleAddAnswer(qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		dispatch(showLoading());

		return saveQuestionAnswer({
			qid,
			answer,
			authedUser
		})
			.then(() =>
				dispatch(
					addAnswer({
						qid,
						answer,
						authedUser
					})
				)
			)
			.then(() => dispatch(hideLoading()));
	};
}
