import React, { useEffect, useState, useContext } from 'react'
import userService from "../utils/userService";
import * as movieApi from "../utils/movieApi";
import * as friendsApi from "../utils/friendsApi"
import { allMoviesData } from './Data'

export const AppContext = React.createContext();



export const AppContextProvider = ({ children }) => {
	const REACT_APP_IMDB_KEY = process.env.REACT_APP_IMDB_KEY
	const [user, setUser] = useState(userService.getUser()); // user data
	const [allUsers, setAllUsers] = useState([]); // all users data
	const [AppData, setAppData] = useState({}); // api call data
	const [APIUrl, setAPIUrl] = useState(`https://imdb-api.com/en/API/MostPopularMovies/${REACT_APP_IMDB_KEY}`) //api url
	const [Title, setTitle] = useState('') // header title
	const [movieData, setMovieData] = useState({});
	const [castData, setCastData] = useState({});
	const [moviesList, setMoviesList] = useState([])
	const [friendStatus, setFriendStatus] = useState([])
	const [userFriends, setuserFriends] = useState([[]])
	const [allMovies, setAllMovies] = useState(allMoviesData)

	const searchList = [
		{ key: 'mostPopular', name: 'Most Popular', url: `https://imdb-api.com/en/API/MostPopularMovies/${REACT_APP_IMDB_KEY}` },
		{ key: 'nowPlaying', name: 'Now Playing', url: `https://imdb-api.com/en/API/InTheaters/${REACT_APP_IMDB_KEY}` },
		{ key: 'top250', name: 'Top 250', url: `https://imdb-api.com/en/API/Top250Movies/${REACT_APP_IMDB_KEY}` },
		{ key: 'comingSoon', name: 'Coming Soon', url: `https://imdb-api.com/en/API/ComingSoon/${REACT_APP_IMDB_KEY}` },

	]

	//Movie API Functions
	function APISearch(Query) {
		setTitle(searchList.filter(x => x.url === Query)[0].name)
		setAPIUrl(Query)
		return (
			fetch(Query)
				.then(response => response.json())
				.then((data) => {setAppData(data);
					setAllMovies(data.items.reduce((a,b) => ({...a, [b.id]:b}), {...allMovies,}));

				})
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



	//Movie Database Functions
	async function getMovies() {
		try {
			const moviesDB = await movieApi.getMovies()
			setMoviesList(moviesDB)

		} catch (error) {
			console.log(error)
		}

	}

	async function addMovie(movieId) {
		try {
			const data = await movieApi.addMovieTolist(movieId);
			getMovies()

		} catch (err) {
			console.log(err)
		}
	}

	async function removeMovie(movieId) {
		try {
			const data = await movieApi.removeMovieFromlist(movieId);
			getMovies()


		} catch (err) {
			console.log(err)
		}
	}

	//User Functions

	async function getAllUsers() {
		try{
			const data = await userService.getAllUsers()
			setAllUsers(data)

		} catch (err) {
			console.log(err)
		}

	}

	function handleLogout() {
		setUser(null);
	}

	function handleSignUpOrLogin() {
		const userData = userService.getUser()
		setUser(userData)
	}

	// Friends Functions
	async function getFriends(friendId) {
		try {
			const data = await friendsApi.getFriends(friendId);
			setFriendStatus(data)


		} catch (err) {
			console.log(err)
		}
	}

	async function getAllFriends() {
		try {
			const data = await friendsApi.getAllFriends();
			setuserFriends(data)

		} catch (err) {
			console.log(err)
		}
	}

	async function friendRequest(friendId) {
		try {
			const data = await friendsApi.friendRequest(friendId);
			getFriends()


		} catch (err) {
			console.log(err)
		}
	}

	async function acceptRequest(friendId) {
		try {
			const data = await friendsApi.acceptRequest(friendId);
			getFriends()


		} catch (err) {
			console.log(err)
		}
	}

	async function rejectRequest(friendId) {
		try {
			const data = await friendsApi.rejectRequest(friendId);
			getFriends()


		} catch (err) {
			console.log(err)
		}
	}

	return (
		<AppContext.Provider value={{
			//User Functions
			handleLogout,
			handleSignUpOrLogin,
			user,
			getAllUsers,
			allUsers,
			//Movie API Fucntions
			APIUrl,
			Title,
			setTitle,
			AppData,
			setAppData,
			APISearch,
			searchList,
			MovieSearch,
			movieData,
			CastSearch,
			castData,
			allMovies,
			//Movie Database Functions
			addMovie,
			removeMovie,
			getMovies,
			moviesList,
			//Friend Functions
			getAllFriends,
			userFriends,
			getFriends,
			friendStatus,
			friendRequest,
			acceptRequest,
			rejectRequest
		}}>{children}</AppContext.Provider>
	)
}
