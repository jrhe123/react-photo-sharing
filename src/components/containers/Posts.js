import React, { Component } from 'react';


// APIManager
import { APIManager } from '../../utils';


// redux
import actions from '../../actions';
import { connect } from 'react-redux';


// components
import { CreatePost } from '../view';


class Posts extends Component{

	componentWillMount() {
		const currentLocation = this.props.posts.currentLocation;
		this.props.fetchPosts(currentLocation);
	}


	componentDidUpdate() {

		const currentLocation = this.props.posts.currentLocation;
		// prevent loop
		if(this.props.posts.list == null){
			
			this.props.fetchPosts(currentLocation);
		}
	}


	// Params received from child component
	submitPost(post){

		const user = this.props.account.user;
		if(user == null){
			alert('please sign up or login to submit.');
			return;
		}
		const currentLocation = this.props.posts.currentLocation;


		post['profile'] = {
			id: user.id,
			username: user.username
		}


		// mongoDB geo search in "Array"
		post['geo'] = [
			currentLocation.lat,
			currentLocation.lng,
		];

		this.props.createPost(post);
	}


	render(){

		const list = this.props.posts.list;

		return(
			<div>
				<CreatePost onCreate={this.submitPost.bind(this)} />
				<div className="table-wrapper">
								<table>
									<thead>
										<tr>
											<th>Image</th>
											<th>Caption</th>
											<th>From</th>
										</tr>
									</thead>
									<tbody>
										{
											(list == null) ? null :
											(
												list.map((post, i) => {
													return (
														<tr key={post.id}>
															<td><img style={{width:64}} src={post.image} /></td>
															<td>{post.caption}</td>
															<td>{post.profile.username}</td>
														</tr>
													)
												})
											)
										}
										
									</tbody>
								</table>
				</div>
			</div>
		)
	}
}


const stateToProps = (state) => {

	// matched here state.xxx.~~
	return {
		posts: state.post,
		account: state.account
	}
}

const dispatchToProps = (dispatch) => {

	return {
		fetchPosts: (params) => dispatch(actions.fetchPosts(params)),

		createPost: (params) => dispatch(actions.createPost(params)),
	}
}

export default connect(stateToProps, dispatchToProps)(Posts)