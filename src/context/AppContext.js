import React, { useEffect, useState, useContext } from 'react'
import userService from "../utils/userService";
import * as movieApi from "../utils/movieApi";
import * as friendsApi from "../utils/friendsApi"
import * as imdbaApi from "../utils/imdbApi"
import { allMoviesData } from './Data'

export const AppContext = React.createContext();



export const AppContextProvider = ({ children }) => {
	const REACT_APP_IMDB_KEY = process.env.REACT_APP_IMDB_KEY
	const [user, setUser] = useState(userService.getUser()); // user data
	const [allUsers, setAllUsers] = useState([]); // all users data
	const [AppData, setAppData] = useState({}); // api call data
	const [Title, setTitle] = useState('') // header title
	const [movieData, setMovieData] = useState({});
	const [castData, setCastData] = useState({});
	const [moviesList, setMoviesList] = useState([])
	const [friendStatus, setFriendStatus] = useState([])
	const [userFriends, setuserFriends] = useState([[]])
	const [allMovies, setAllMovies] = useState(allMoviesData)
	const [searchKey, setSearchKey] = useState('mostPopular')

	const searchList = [
		{ key: 'mostPopular', name: 'Most Popular'},
		{ key: 'nowPlaying', name: 'Now Playing'},
		{ key: 'top250', name: 'Top 250'},
		{ key: 'comingSoon', name: 'Coming Soon'},
	
	]
	// API Functions
	async function APISearch(key) {
		setSearchKey(key)
		setTitle(searchList.filter(x => x.key === key)[0]?.name)
		try {
			const data = await imdbaApi.APISearch(key)
			setAppData(data.data)
			setAllMovies(data.data.items.reduce((a,b) => ({...a, [b.id]:b}), {...allMovies,}))

		} catch (error) {
			console.log(error)
		}
	}
	
	async function MovieSearch(id) {
		try {
			const data = await imdbaApi.MovieSearch(id)
			setMovieData(data)

		} catch (error) {
			console.log(error)
		}
	
	}
	
	async function CastSearch(id) {
		try {
			const data = await imdbaApi.CastSearch(id)
			setCastData(data.data)

		} catch (error) {
			console.log(error)
		}
	
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
			searchKey,
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
