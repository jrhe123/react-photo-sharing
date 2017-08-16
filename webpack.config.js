var webpack = require('webpack')
var path = require('path')

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		filename: 'public/dist/bundle.js',
		sourceMapFilename: 'public/dist/bundle.map.js'
	},
	devtool: '#source-map',
	plugins: process.env.NODE_ENV === 'production' ? [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: true
			}
		})
	] : [],
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	}
}