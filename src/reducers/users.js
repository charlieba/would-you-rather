import { GET_USERS } from '../actions/users';
import { SET_QUESTION, SET_ANSWER } from '../actions/questions';

export default function users(state = {}, action) {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				...action.users
			};

		case SET_QUESTION:
			return {
				...state,
				[action.question.author]: {
					...state[action.question.author],
					questions: state[action.question.author].questions.concat([
						action.question.id
					])
				}
			};

		case SET_ANSWER:
			const { qid, answer, authedUser } = action.answerInfo;

			return {
				...state,
				[authedUser]: {
					...state[authedUser],
					answers: {
						...state[authedUser].answers,
						[qid]: answer
					}
				}
			};

		default:
			return state;
	}
}
