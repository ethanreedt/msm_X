const supertest = require('supertest')
const app = require('../../src/app');
const request = supertest(app);

const mongoose = require('mongoose');
const Store = require('../../src/store.model');
const dbName = 'store-endpoints';
beforeAll(async () => {
    const url = `mongodb://127.0.0.1:27017/${dbName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
});

afterEach(async () => {
    await Store.deleteMany();
});

it('It should GET all stores', async done => {
    const res = await request.get('/stores');
    
    expect(res.status).toBe(200);
    done();
});

it('It should POST new store', async done => {
    const newStoreTitle = 'store 1';
    const res = await request.post('/stores/add')
    .send({
        title: newStoreTitle
    });
    // Store creation successful
    expect(res.status).toBe(201);

    // New store is in database
    const store = await Store.findById(res.body.store_id);
    expect(store).not.toBe(undefined);
    expect(store.title).toBe(newStoreTitle);
    done();
});

it('It should UPDATE store', async done => {
    done();
});