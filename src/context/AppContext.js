import React, { useEffect, useState, useContext } from 'react'
import userService from "../utils/userService";
export const AppContext = React.createContext();
	


export const AppContextProvider = ({children}) => {
	const [user, setUser] = useState(userService.getUser());
	const [AppData, setAppData] = useState({});



	
	
	function handleLogout() {
		setUser(null);
	}
	function handleSignUpOrLogin() {
		const userData = userService.getUser()
		setUser(userData)
	}



	return (
		<AppContext.Provider value={{handleLogout, handleSignUpOrLogin, user}}>{children}</AppContext.Provider>
	)
}
