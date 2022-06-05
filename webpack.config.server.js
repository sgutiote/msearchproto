const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const backendPath = 'dist';

module.exports = (_, argv) => {
	const isProduction = argv.mode === 'none';

	return {
		name: 'server',
		devtool: isProduction ? false : 'source-map',
		entry: { index: './src/server' },
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, backendPath),
		},
		resolve: {
			extensions: ['.js', '.json']
		},
		externals: [nodeExternals()],
		target: 'node',
		node: {
			__dirname: false
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					use: 'babel-loader',
					exclude: /node_modules/
				},
				{ test: /\.(scss|css)$/, loader: 'ignore-loader' }
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new CopyPlugin({ patterns: [{ from: 'src/server/views', to: 'views' }] })
		]
	};
};