// Import Schema
var Post = require('../models/Post');

// Promise
var Promise = require('bluebird');


module.exports = {

	get: function(params, isRaw){

		return new Promise(function(resolve, reject){

			// check geo(lat, lng) query
			if(params.lat!=null && params.lng!=null){

				// mongoose geo query
				var range = 50 / 6371; // 6371 is radius of earth in KM
				params['geo'] = {
					$near: [params.lat, params.lng],
					$maxDistance: range
				}
				delete params['lat'];
				delete params['lng'];
			}

			var filters = {
				sort: {
					timestamp: -1
				}
			}
			Post.find(params, null, filters, function(err, posts){

				if(err){
					reject(err);
					return;
				}

				if(isRaw){
					resolve(posts);
					return;
				}

				var list = [];
				posts.forEach(function(post, i){
					list.push(post.summary())
				})
				resolve(list);

			})
		})
	},


	getById: function(id, isRaw){

		return new Promise(function(resolve, reject){

			Post.findById(id, function(err, post){

				if(err){
					reject(err);
					return;
				}

				if(isRaw){
					resolve(post);
					return;
				}

				resolve(post.summary());

			})
		})
	},


	post: function(params, isRaw){

		return new Promise(function(resolve, reject){

			Post.create(params, function(err, post){

				if(err){
					reject(err);
					return;
				}

				if(isRaw){
					resolve(post);
					return;
				}

				resolve(post.summary());
				
			})
		})
	},

	
}