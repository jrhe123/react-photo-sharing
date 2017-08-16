import React, { Component } from 'react';

// libraries
import sha1 from 'sha1';
import Dropzone from 'react-dropzone';


// APIManager
import { APIManager } from '../../utils';


class CreatePost extends Component{

	constructor(props) {
		super(props);
		
		this.state = {
			post: {
				image: '',
				caption: ''
			}
		}
	}


	updatePost(e){

		e.preventDefault();

		let updated = Object.assign({}, this.state.post);
		updated[e.target.id] = e.target.value;
		this.setState({
			post : updated
		})

		return;
	}


	imageSelected(files){

		const image = files[0];

		// Cloudinary settings
		const cloudName = 'dqtdsrmtz'
	    const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'

	    const timestamp = Date.now()/1000
	    const uploadPreset = 'b7pf403i'

	    const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'2x2yvctaUAQW1L7aW3B4iNMInbc'

	    const signature = sha1(paramsStr)
	    const params = {
	      'api_key': '796416677457891',
	      'timestamp': timestamp,
	      'upload_preset': uploadPreset,
	      'signature': signature
	    }

	    APIManager.uploadFile(url, image, params)
	    	.then((uploaded) => {

	    		let updated = Object.assign({}, this.state.post);
				updated['image'] = uploaded['secure_url'];
				this.setState({
					post: updated
				})
	    	})
	    	.catch((err) => {
	    		console.log('err: ', err);
	    	})
	}


	submitPost(e){

		e.preventDefault();

		if(this.state.post.image.length == 0){
			alert('please add a image.');
			return;
		}else if(this.state.post.caption.length == 0){
			alert('please add caption.');
			return;
		}
		let updated = Object.assign({}, this.state.post);
		this.props.onCreate(updated);

		return;
	}


	render(){

		return(
			<div style={{background:"#fff"}}>
				<h2>create post</h2>
				<input id="caption" onChange={this.updatePost.bind(this)} type="text" placeholder="Caption" />
				<div className="row">
					<div className="3u 12u$(small)">
						<Dropzone onDrop={this.imageSelected.bind(this)} style={style.drop}>
							<button href="#" className="button special small">Upload Image</button>
						</Dropzone>
					</div>
					<div className="3u 12u$(small)">
						<button className="button special small" style={{marginTop: 12, marginLeft: 12, width: "90%"}} onClick={this.submitPost.bind(this)}>Submit</button>
					</div>
					<div className="6u 12u$(small)">
						<img style={{width:120, float:"right", marginTop:12}} src={this.state.post.image} />
					</div>
				</div>				
				
				<br /><br />
				<hr />
			</div>
		)
	}
}


export default CreatePost

const style = {

	drop: {
		border: 'none',
		marginTop: 12
	}
}