import api from './api';
import view from './view';

const Routes = (app) => {
    app.use(["/", "/items/:itemId"], view);
    app.use("/api", api)
}

export default Routes;