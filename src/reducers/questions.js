import { GET_QUESTION, SET_QUESTION, SET_ANSWER } from '../actions/questions';

export default function questions(state = {}, action) {
	switch (action.type) {
		case GET_QUESTION:
			return {
				...state,
				...action.questions
			};

		case SET_QUESTION:
			return {
				...state,
				[action.question.id]: action.question
			};

		case SET_ANSWER:
			const { qid, answer, authedUser } = action.answerInfo;

			return {
				...state,
				[qid]: {
					...state[qid],
					[answer]: {
						...state[qid][answer],
						votes: state[qid][answer].votes.concat([authedUser])
					}
				}
			};

		default:
			return state;
	}
}
