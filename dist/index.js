/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startServer": () => (/* binding */ startServer)
/* harmony export */ });
/* harmony import */ var express_async_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var express_async_errors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express_async_errors__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var express_handlebars__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var express_handlebars__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express_handlebars__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);






process.env.DEFAULT_PORT = '4000';
const PUBLIC_CONTEXT = '/../public';
const VIEWS_PATH = path__WEBPACK_IMPORTED_MODULE_4___default().join(__dirname, './views');

const startServer = (port = process.env.PORT || process.env.DEFAULT_PORT) => {
  const app = express__WEBPACK_IMPORTED_MODULE_2___default()();
  app.use(cors__WEBPACK_IMPORTED_MODULE_1___default()());
  app.use("/statics", express__WEBPACK_IMPORTED_MODULE_2___default()["static"](path__WEBPACK_IMPORTED_MODULE_4___default().join(__dirname, PUBLIC_CONTEXT)));
  app.set('views', VIEWS_PATH);
  /* HANDLEBARS */

  app.engine('.html', express_handlebars__WEBPACK_IMPORTED_MODULE_3___default()({
    extname: '.html',
    partialsDir: VIEWS_PATH,
    layoutsDir: path__WEBPACK_IMPORTED_MODULE_4___default().join(VIEWS_PATH, '/layouts'),
    helpers: {
      'static-context': () => "/statics",
      toJSON: object => JSON.stringify(object)
    }
  }));
  app.set('view engine', '.html');
  /* HANDLEBARS */

  /* BODY PARSER */

  app.use(express__WEBPACK_IMPORTED_MODULE_2___default().json());
  /* BODY PARSER */

  (0,_routes__WEBPACK_IMPORTED_MODULE_5__["default"])(app);
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
    await server.close().then(() => {
      console.log('Server successfully closed');
    }).catch(e => {
      console.log('Something went wrong closing the server', e.stack);
    });

    if (options.exit) {
      process.exit();
    }
  }; // do something when app is closing


  process.on('exit', exitHandler); // catches ctrl+c event

  process.on('SIGINT', exitHandler.bind(null, {
    exit: true
  })); // catches 'kill pid' (for example: nodemon restart)

  process.on('SIGUSR1', exitHandler.bind(null, {
    exit: true
  }));
  process.on('SIGUSR2', exitHandler.bind(null, {
    exit: true
  })); // catches uncaught exceptions

  process.on('uncaughtException', exitHandler.bind(null, {
    exit: true
  }));
};



/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("express-async-errors");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("cors");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("express-handlebars");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);



const Routes = app => {
  app.use(["/", "/items/:itemId"], _view__WEBPACK_IMPORTED_MODULE_1__["default"]);
  app.use("/api", _api__WEBPACK_IMPORTED_MODULE_0__["default"]);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Routes);

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _items__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _detail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);



const ApiRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
ApiRouter.route("/items").get(_items__WEBPACK_IMPORTED_MODULE_1__["default"]);
ApiRouter.route("/items/:itemId").get(_detail__WEBPACK_IMPORTED_MODULE_2__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiRouter);

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function mode(items) {
  if (items.length == 0) return null;
  var modeMap = {};
  var maxEl = items[0].category_id,
      maxCount = 1;

  for (var i = 0; i < items.length; i++) {
    var el = items[i].category_id;
    if (modeMap[el] == null) modeMap[el] = 1;else modeMap[el]++;

    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }

  return maxEl;
}

const breadcrumbs = async id => {
  const response = await fetch(`https://api.mercadolibre.com/categories/${id}`);

  if (response.ok) {
    const data = await response.json();
    return data.path_from_root.map(c => c.name);
  } else {
    return [""];
  }
};

const Items = async (_, res) => {
  const client = _.get('X-Client').split(".");

  const query = _.query.q;
  const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4&sort=relevance`);

  if (response.ok) {
    const data = await response.json();
    const bestCategory = mode(data.results);
    const pathFromRoot = await breadcrumbs(bestCategory);
    res.status(200).json({
      author: {
        name: client[0],
        lastname: client[1]
      },
      items: data.results.map(r => ({
        id: r.id,
        title: r.title,
        price: {
          currency: r.currency_id,
          amount: r.price,
          decimals: 0
        },
        picture: r.thumbnail,
        condition: r.condition,
        free_shipping: r.shipping.free_shipping,
        state_name: r.address.state_name
      })),
      categories: pathFromRoot
    });
  } else {
    res.status(500);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Items);

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const breadcrumbs = async id => {
  const response = await fetch(`https://api.mercadolibre.com/categories/${id}`);

  if (response.ok) {
    const data = await response.json();
    return data.path_from_root.map(c => c.name);
  } else {
    return [""];
  }
};

const detail = async (_, res) => {
  const itemId = _.params.itemId;

  const client = _.get('X-Client').split(".");

  const response = await fetch(`https://api.mercadolibre.com/items/${itemId}`);

  if (response.ok) {
    const data = await response.json();
    const bestCategory = data.category_id;
    const pathFromRoot = await breadcrumbs(bestCategory);
    const descriptionResponse = await fetch(`https://api.mercadolibre.com/items/${itemId}/description`);

    if (response.ok) {
      const descriptionData = await descriptionResponse.json();
      res.status(200).json({
        author: {
          name: client[0],
          lastname: client[1]
        },
        id: data.id,
        title: data.title,
        price: {
          amount: data.price,
          currency: data.currency_id,
          decimals: 0
        },
        picture: data.pictures[0].url,
        condition: data.condition,
        free_shipping: data.shipping.free_shipping,
        sold_quantity: data.sold_quantity,
        categories: pathFromRoot,
        description: descriptionData.plain_text
      });
    }
  } else {
    res.status(500);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (detail);

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);

const ViewRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();
ViewRouter.route("/").get((_, res) => {
  const model = {
    base: '',
    title: 'Mercado Libre'
  };
  res.render('index', model);
});
ViewRouter.route("/items/:itemId").get((_, res) => {
  const model = {
    base: '',
    title: 'Mercado Libre',
    bundleName: 'item'
  };
  res.render('index', model);
});
ViewRouter.route("/search").get((_, res) => {
  const model = {
    base: '',
    title: 'Mercado Libre',
    bundleName: 'search',
    inputSearch: _.query.q
  };
  res.render('index', model);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewRouter);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _start__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

(0,_start__WEBPACK_IMPORTED_MODULE_0__.startServer)();
})();

/******/ })()
;