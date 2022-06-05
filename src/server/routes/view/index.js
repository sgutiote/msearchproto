import express from 'express';

const ViewRouter = express.Router();

ViewRouter.route("/").get((_, res) => {
	const model = {
		base: '',
		title: 'Mercado Libre',
	};
	res.render('index', model);
})

ViewRouter.route("/items/:itemId").get((_, res) => {
	const model = {
		base: '',
		title: 'Mercado Libre',
		bundleName: 'item'
	};
	res.render('index', model);
})

ViewRouter.route("/search").get((_, res) => {
	const model = {
		base: '',
		title: 'Mercado Libre',
		bundleName: 'search',
		inputSearch: _.query.q
	};
	res.render('index', model);
})

export default ViewRouter;