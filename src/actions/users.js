export const GET_USERS = 'RECEIVE_USERS';

export function receiveUsers(users) {
	return {
		type: GET_USERS,
		users
	};
}
