const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const vendorPath = './public/dist';

module.exports = (_, argv) => {
	const isProduction = argv.mode === 'production';

	return {
		name: 'client',
		devtool: isProduction ? false : 'source-map',
		watchOptions: {
			ignored: /node_modules/
		},
		entry: {
			search: './src/client/pages/search/index.js',
			item: './src/client/pages/item/index.js',
		},
		output: {
			filename: 'js/[name].bundle.js',
			path: path.join(__dirname, vendorPath)
		},
		plugins: [
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: '[name].css'
			})
		].filter(Boolean),
		optimization: {
			removeAvailableModules: false,
			removeEmptyChunks: false,
			minimizer: [new TerserPlugin({ parallel: true }), new CssMinimizerPlugin()],
			splitChunks: {
				minSize: 30000,
				minChunks: 1,
				maxAsyncRequests: 2,
				maxInitialRequests: 2,
				automaticNameDelimiter: '~',
				name: false,
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						priority: -10,
						name: 'vendor'
					},
					default: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true
					}
				}
			}
		},
		resolve: {
			extensions: ['*', '.js', '.jsx', 'scss', 'css', '.json'],
			modules: [
				path.join(__dirname, 'node_modules'),
				path.join(__dirname, 'node_modules/.pnpm/node_modules')
			],
			alias: {
				VENDORS: path.resolve(__dirname, 'src/client/vendors')
			}
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					use: 'babel-loader',
					exclude: /node_modules/
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						// Creates `style` nodes from JS strings
						"style-loader",
						// Translates CSS into CommonJS
						"css-loader",
						// Compiles Sass to CSS
						"sass-loader",
					],
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader']
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					type: 'asset/resource',
					generator: {
						filename: 'fonts/[name].[ext]'
					}
				},
				{
					test: /\.(png|jp(e*)g|svg|ico)$/,
					type: 'asset/resource',
					generator: {
						filename: 'images/[name].[ext]'
					}
				}
			]
		}
	};
};
