import React, { useEffect, useState, useContext } from 'react'
import userService from "../utils/userService";
export const AppContext = React.createContext();
	


export const AppContextProvider = ({children}) => {
	const REACT_APP_IMDB_KEY=process.env.REACT_APP_IMDB_KEY
	const [user, setUser] = useState(userService.getUser());
	const [AppData, setAppData] = useState({});
	const [APIUrl, setAPIUrl] = useState('')
	const [movieData, setMovieData] = useState({});
	const [castData, setCastData] = useState({});
	const searchList = [
		{key: 'mostPopular', name:'Most Popular',url:`https://imdb-api.com/en/API/MostPopularMovies/${REACT_APP_IMDB_KEY}`},
		{key:'nowPlaying', name:'Now Playing',url:`https://imdb-api.com/en/API/InTheaters/${REACT_APP_IMDB_KEY}`},
		{key:'comingSoon', name:'Coming Soon',url:`https://imdb-api.com/en/API/ComingSoon/${REACT_APP_IMDB_KEY}`},
		{key:'top250', name:'Top 250',url:`https://imdb-api.com/en/API/Top250Movies/${REACT_APP_IMDB_KEY}`}
]
	
	function APISearch(Query) {
		console.log('APISearch')

		return (
			fetch(Query)
			.then(response => response.json())
			.then(data => setAppData(data))
			
		)
	}

	function MovieSearch(id) {
		const url = `https://imdb-api.com/en/API/Title/${REACT_APP_IMDB_KEY}/${id}`
		return (
			fetch(url)
			.then(response => response.json())
			.then(data => setMovieData(data))
		)

	}


	function CastSearch(id) {
		const url = `https://imdb-api.com/en/API/FullCast/${REACT_APP_IMDB_KEY}/${id}`
		return (
			fetch(url)
			.then(response => response.json())
			.then(data => setCastData(data))
		)

	}


	



	
	function handleLogout() {
		setUser(null);
	}
	function handleSignUpOrLogin() {
		const userData = userService.getUser()
		setUser(userData)
	}



	return (
		<AppContext.Provider value={{
			handleLogout, 
			handleSignUpOrLogin, 
			user, 
			AppData, 
			APISearch, 
			searchList, 
			MovieSearch, 
			movieData,
			CastSearch, 
			castData,
		}}>{children}</AppContext.Provider>
	)
}
