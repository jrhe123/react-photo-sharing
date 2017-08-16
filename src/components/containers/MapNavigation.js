import React, { Component } from 'react';


// redux
import actions from '../../actions';
import { connect } from 'react-redux';


// components
import { Map } from '../view';


class MapNavigation extends Component{


	// Receive data from child component
	setNewLocation(location){

		this.props.updateCurrentLocation(location);
	}
	

	render(){

		return(
			<div>
				<Map center={this.props.posts.currentLocation} 
				     zoom={14}
				     mapMoved={this.setNewLocation.bind(this)}/>
			</div>
		)
	}


}

const stateToProps = (state) => {

	// matched here state.xxx.~~
	return {
		posts: state.post
	}
}

const dispatchToProps = (dispatch) => {

	return {
		updateCurrentLocation: (location) => dispatch(actions.updateCurrentLocation(location)),
	}
}

export default connect(stateToProps, dispatchToProps)(MapNavigation)
