import React, { useState } from 'react';
import AddUser from '../components/Test/AddUser';
import UserList from '../components/Test/UserList';
import { AppContext } from '../Context/context';

function App() {
	const [ users, setUsers ] = useState([]);
	
	const dispatchUserEvent = (actionType, payload) => {
		switch (actionType) {
			case 'ADD_USER':
				setUsers([ ...users, payload.newUser ]);
				return;
			case 'REMOVE_USER':
				setUsers(users.filter(user => user.id !== payload.userId));
				return;
			default:
				return;
		}
	};

	return (
		<div>
			<AppContext.Provider value={{ users, dispatchUserEvent }}>
				<AddUser />
				<UserList />
			</AppContext.Provider>
		</div>
	);
}

export default App;