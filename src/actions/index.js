import constants from '../constants';

import { APIManager } from '../utils';

export default {


	// 1. post 
	postsReceived: (posts) => {

		console.log('action called, now go to reducer');
		return {
			type: constants.POSTS_RECEIVED,
			posts: posts
		}
	},

	fetchPosts: (params) => {

		console.log('action called, now go to reducer');
		return (dispatch) => {

			APIManager
				.get('/api/post', params)
				.then((response) => {
					
					dispatch({
						type: constants.POSTS_RECEIVED,
						posts: response.results
					})
				})
				.catch((err) => {
					console.log("err: ", err);
				})
		}
	},
	
	updateCurrentLocation: (location) => {

		console.log('action called, now go to reducer');
		return {
			type: constants.CURRENT_LOCATION_CHANGED,
			location: location
		}
	},


	createPost: (params) => {

		console.log('action called, now go to reducer');
		return (dispatch) => {

			APIManager
				.post('/api/post', params)
				.then((response) => {
					
					dispatch({
						type: constants.POST_CREATED,
						post: response.result
					})
				})
				.catch((err) => {
					console.log("err: ", err);
				})
		}
	},




	// 2.account
	signup: (params) => {

		console.log('action called, now go to reducer');
		return (dispatch) => {

			APIManager
				.post('/account/register', params)
				.then((response) => {
					
					dispatch({
						type: constants.CURRENT_USER_RECEIVED,
						user: response.user
					})
				})
				.catch((err) => {
					console.log("err: ", err);
				})
		}
	},

	login: (params) => {

		console.log('action called, now go to reducer');
		return (dispatch) => {

			APIManager
				.post('/account/login', params)
				.then((response) => {
					
					dispatch({
						type: constants.CURRENT_USER_RECEIVED,
						user: response.user
					})
				})
				.catch((err) => {
					console.log("err: ", err);
					alert(err.message);
				})
		}
	},

	checkCurrentUser: () => {

		console.log('action called, now go to reducer');
		return (dispatch) => {

			APIManager
				.get('/account/currentuser', null)
				.then((response) => {
					
					dispatch({
						type: constants.CURRENT_USER_RECEIVED,
						user: response.user
					})
				})
				.catch((err) => {
					console.log("err: ", err);
				})
		}
	},

}