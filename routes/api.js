var express = require('express');
var router = express.Router();



// Controllers
var controllers = require('../controllers');



// get list
router.get('/:resource', function(req, res, next) {

	var resource = req.params.resource;
	
	var controller = controllers[resource];
	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'
		})
		return;
	}

	controller.get(req.query, false)
		.then(function(results){

			res.json({
				confirmation: 'success',
				results: results
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: err
			})
		})

});




// get by id
router.get('/:resource/:id', function(req, res, next) {

	var resource = req.params.resource;
	
	var controller = controllers[resource];
	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'
		})
		return;
	}

	controller.getById(req.params.id, false)
		.then(function(result){

			res.json({
				confirmation: 'success',
				result: result
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: 'Not Found'
			})
		})

});




// create
router.post('/:resource', function(req, res, next) {

	var resource = req.params.resource;
	
	var controller = controllers[resource];
	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'
		})
		return;
	}

	controller.post(req.body, false)
		.then(function(result){

			res.json({
				confirmation: 'success',
				result: result
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: err
			})
		})

});

module.exports = router;
