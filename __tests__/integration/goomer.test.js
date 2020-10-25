import request from 'supertest';

import app from '../../src/app';

describe('Restaurant', () => {
  // STORE
  it('should be able to register', async () => {
    const response = await request(app).post('/restaurant').send({
      email: 'vitor.hiro@gmail.com',
      password: '123456',
      name: 'Vitor Hiroyuki Kano',
      phone: '(15) 99102-5751',
      cnpj: '60.963.212/0001-04',
      zip_code: '18071-490',
      street: 'Avenida Betsaida',
      complement: '',
      neighborhood: 'Jardim Betania',
      city: 'Sorocaba',
      state: 'SP',
      number: '142',
    });

    expect(response.body).toHaveProperty('id');
  });

  // SHOW
  it('should be able to show a specific restaurant', async () => {
    const response = await request(app).get('/restaurant/1');

    expect(response.body).toHaveProperty('id');
  });

  // UPDATE
  it('should be able to update a restaurant', async () => {
    const response = await request(app).put('/restaurant/1').send({
      password: '654321',
      zip_code: '18087-289',
      street: 'Rua Antonio Fasoli',
      complement: '',
      neighborhood: 'Jardim Residencial Villa Olympia',
      number: '500',
    });

    expect(response.body).toHaveProperty('id');
  });

  // INDEX
  it('should be able to list all restaurants', async () => {
    const response = await request(app).get('/restaurants');

    expect(response.body[0]).toHaveProperty('id');
  });

  // DELETE
  it('should be able to delete a restaurant', async () => {
    const response = await request(app).delete('/restaurant/1');

    expect(response.body).toHaveProperty('id');
  });
});

describe('Restaurant work period', () => {
  // STORE
  it('should be able to register', async () => {
    const response = await request(app).post('/work-period').send({
      restaurant_id: 1,
      week_day: 1,
      start_hour: '08:00',
      end_hour: '18:00',
      period: 1,
    });

    expect(response.body).toHaveProperty('id');
  });

  // SHOW
  it('should be able to show a specific work period', async () => {
    const response = await request(app).get('/work-period/1');

    expect(response.body).toHaveProperty('id');
  });

  // UPDATE
  it('should be able to update a work period', async () => {
    const response = await request(app).put('/work-period/1').send({
      start_hour: '12:00',
      end_hour: '22:00',
    });

    expect(response.body).toHaveProperty('id');
  });

  // INDEX
  it('should be able to list all restaurants`s work periods', async () => {
    const response = await request(app).get('/restaurant/1/work-periods');

    expect(response.body[0]).toHaveProperty('id');
  });
  // DELETE
  it('should be able to delete a work period', async () => {
    const response = await request(app).delete('/work-period/1');

    expect(response.body).toHaveProperty('id');
  });
});

describe('Category', () => {
  // STORE
  it('should be able to register', async () => {
    const response = await request(app).post('/category').send({
      restaurant_id: 1,
      name: 'Comidas',
    });

    expect(response.body).toHaveProperty('id');
  });

  // SHOW
  it('should be able to show a specific category', async () => {
    const response = await request(app).put('/category/1');

    expect(response.body).toHaveProperty('id');
  });

  // UPDATE
  it('should be able to update a category', async () => {
    const response = await request(app).get('/category/1').send({
      start_hour: '12:00',
      end_hour: '22:00',
    });

    expect(response.body).toHaveProperty('id');
  });

  // INDEX
  it('should be able to list all restaurant`s categories', async () => {
    const response = await request(app).get('/restaurant/1/categories');

    expect(response.body[0]).toHaveProperty('id');
  });

  // DELETE
  it('should be able to delete a category', async () => {
    const response = await request(app).delete('/category/1');

    expect(response.body).toHaveProperty('id');
  });
});

describe('Product', () => {
  // STORE
  it('should be able to register', async () => {
    const response = await request(app).post('/product').send({
      restaurant_id: 1,
      category_id: 1,
      name: 'Lasanha',
      description: 'A melhor lasanha da região.',
    });

    expect(response.body).toHaveProperty('id');
  });

  // SHOW
  it('should be able to show a specific product', async () => {
    const response = await request(app).get('/product/1');

    expect(response.body).toHaveProperty('id');
  });

  // UPDATE
  it('should be able to update a product', async () => {
    const response = await request(app).put('/product/1').send({
      name: 'Lasanha de frango',
      description: 'A melhor lasanha de frango da região.',
    });

    expect(response.body).toHaveProperty('id');
  });

  // INDEX
  it('should be able to list all restaurant`s products', async () => {
    const response = await request(app).get('/restaurant/1/products');

    expect(response.body[0]).toHaveProperty('id');
  });

  // DELETE
  it('should be able to delete a product', async () => {
    const response = await request(app).delete('/product/1');

    expect(response.body).toHaveProperty('id');
  });
});

describe('Product table prices', () => {
  // STORE
  it('should be able to register', async () => {
    const response = await request(app).post('/product/table-price').send({
      restaurant_id: 1,
      product_id: 1,
      regular_price: 15,
      promotional_price: 10.99,
      promotional_price_description: 'Dia da lasanha!!',
      promotional_price_start_at: '2020-10-25T14:00:00-03:00',
      promotional_price_end_at: '2020-10-25T23:00:00-0300',
    });

    expect(response.body).toHaveProperty('id');
  });

  // SHOW
  it('should be able to show a specific table price', async () => {
    const response = await request(app).get('/product/table-price/1');

    expect(response.body).toHaveProperty('id');
  });

  // UPDATE
  it('should be able to update a product table price', async () => {
    const response = await request(app).put('/product/table-price/1').send({
      regular_price: 19.9,
      promotional_price: 15,
      promotional_price_description: 'Dia da lasanha de frango!!',
    });

    expect(response.body).toHaveProperty('id');
  });

  // INDEX
  it('should be able to list all product`s table prices ', async () => {
    const response = await request(app).get('/product/1/table-prices');

    expect(response.body[0]).toHaveProperty('id');
  });

  // DELETE
  it('should be able to delete a product table price', async () => {
    const response = await request(app).delete('/product/table-price/1');

    expect(response.body).toHaveProperty('id');
  });
});
