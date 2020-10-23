import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import RestaurantController from './app/controllers/RestaurantController';
import RestaurantPhotoController from './app/controllers/RestaurantPhotoController';
import RestaurantWorkPeriodController from './app/controllers/RestaurantWorkPeriodController';
import CategoryController from './app/controllers/CategoryController';
import ProductController from './app/controllers/ProductController';
import ProductPhotoController from './app/controllers/ProductPhotoController';
import ProductTablePriceController from './app/controllers/ProductTablePriceController';

const routes = new Router();
const upload = multer(multerConfig);
const type = upload.single('file');

// Routes to restaurants
routes.post('/restaurant', RestaurantController.store);
routes.get('/restaurant/:id', RestaurantController.show);
routes.put('/restaurant/:id', RestaurantController.update);
routes.delete('/restaurant/:id', RestaurantController.delete);
routes.get('/restaurants', RestaurantController.index);

// Routes to restaurant photos
routes.post(
  '/restaurant/:restaurant_id/photo',
  type,
  RestaurantPhotoController.store
);
routes.get('/restaurant/photo/:id', RestaurantPhotoController.show);
routes.put('/restaurant/photo/:id', type, RestaurantPhotoController.update);
routes.delete('/restaurant/photo/:id', RestaurantPhotoController.delete);
routes.get(
  '/restaurant/:restaurant_id/photos',
  RestaurantPhotoController.index
);

// Routes to restaurants work periods
routes.post('/work-period', RestaurantWorkPeriodController.store);
routes.get('/work-period/:id', RestaurantWorkPeriodController.show);
routes.put('/work-period/:id', RestaurantWorkPeriodController.update);
routes.delete('/work-period/:id', RestaurantWorkPeriodController.delete);
routes.get(
  '/restaurant/:restaurant_id/work-periods',
  RestaurantWorkPeriodController.index
);

// Routes to categories
routes.post('/category', CategoryController.store);
routes.get('/category/:id', CategoryController.show);
routes.put('/category/:id', CategoryController.update);
routes.delete('/category/:id', CategoryController.delete);
routes.get('/restaurant/:restaurant_id/categories', CategoryController.index);

// Routes to products
routes.post('/product', ProductController.store);
routes.get('/product/:id', ProductController.show);
routes.put('/product/:id', ProductController.update);
routes.delete('/product/:id', ProductController.delete);
routes.get('/restaurant/:restaurant_id/products', ProductController.index);

// Routes to product photos
routes.post('/product/:product_id/photo', type, ProductPhotoController.store);
routes.get('/product/photo/:id', ProductPhotoController.show);
routes.put('/product/photo/:id', type, ProductPhotoController.update);
routes.delete('/product/photo/:id', ProductPhotoController.delete);
routes.get('/product/:product_id/photos', ProductPhotoController.index);

// Routes to product table price
routes.post('/product/table-price', ProductTablePriceController.store);
routes.get('/product/table-price/:id', ProductTablePriceController.show);
routes.put('/product/table-price/:id', ProductTablePriceController.update);
routes.delete('/product/table-price/:id', ProductTablePriceController.delete);
routes.get(
  '/product/:product_id/table-prices',
  ProductTablePriceController.index
);

export default routes;
