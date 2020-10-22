import { Router } from 'express';

import RestaurantController from './app/controllers/RestaurantController';

const routes = new Router();

routes.post('/restaurant', RestaurantController.store);
routes.get('/restaurant/:id', RestaurantController.show);
routes.put('/restaurant/:id', RestaurantController.update);
routes.delete('/restaurant/:id', RestaurantController.delete);

routes.get('/restaurants', RestaurantController.index);

export default routes;
