import 'express-async-errors';

import cors from 'cors';
import express from 'express';
import exphbs from 'express-handlebars';

import path from 'path';

import routes from './routes';

process.env.DEFAULT_PORT = '4000';

const PUBLIC_CONTEXT = '/../public';
const VIEWS_PATH = path.join(__dirname, './views');

const startServer = (port = process.env.PORT || process.env.DEFAULT_PORT) => {
	const app = express();

	app.use(cors());

	app.use("/statics", express.static(path.join(__dirname, PUBLIC_CONTEXT)));

	app.set('views', VIEWS_PATH);

	/* HANDLEBARS */
	app.engine(
		'.html',
		exphbs({
			extname: '.html',
			partialsDir: VIEWS_PATH,
			layoutsDir: path.join(VIEWS_PATH, '/layouts'),
			helpers: {
				'static-context': () => "/statics",
				toJSON: object => JSON.stringify(object)
			}
		})
	);
	app.set('view engine', '.html');
	/* HANDLEBARS */

	/* BODY PARSER */
	app.use(express.json());

	/* BODY PARSER */

	routes(app);

	return new Promise(resolve => {
		const server = app.listen(port, () => {
			console.log(`Listening on port ${server.address().port}`);
			const originalClose = server.close.bind(server);
			server.close = () => {
				return new Promise(resolveClose => {
					originalClose(resolveClose);
				});
			};
			setupCloseOnExit(server);
			resolve(server);
		});
	});
};

const setupCloseOnExit = server => {
	const exitHandler = async (options = {}) => {
		await server
			.close()
			.then(() => {
				console.log('Server successfully closed');
			})
			.catch(e => {
				console.log('Something went wrong closing the server', e.stack);
			});
		if (options.exit) {
			process.exit();
		}
	};

	// do something when app is closing
	process.on('exit', exitHandler);

	// catches ctrl+c event
	process.on('SIGINT', exitHandler.bind(null, { exit: true }));

	// catches 'kill pid' (for example: nodemon restart)
	process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
	process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

	// catches uncaught exceptions
	process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
};

export { startServer };