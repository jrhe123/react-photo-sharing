import constants from '../constants';

var initialState = {

	list: null,

	currentLocation: {
		lat: 43.6482121,
		lng: -79.434982
	},

}

export default (state = initialState, action) => {


	let updated = Object.assign({}, state);
	switch(action.type){

		case constants.POSTS_RECEIVED:

			console.log('reducer received, call back to component');
			
			updated['list'] = action.posts;
			return updated;


		case constants.POST_CREATED:

			console.log('reducer received, call back to component');
			
			let updatedList = (updated['list'] == null) ? [] : Object.assign([], updated['list']);
			updatedList.unshift(action.post)
			updated['list'] = updatedList;
			return updated;	


		case constants.CURRENT_LOCATION_CHANGED:

			console.log('reducer received, call back to component');
			
			updated['currentLocation'] = action.location;
			updated['list'] = null;
			return updated;	


		default:
			
			return state;	

	}

}