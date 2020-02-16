const express = require('express');
const router = express.Router();

let Store = require('./store.model');

router.get('/', (req, res) => {
    Store.find((err, stores) => {
        if (err) 
            res.json(err);
        else 
            res.json(stores);
    });
});

router.post('/add', (req, res) => {
    let store = new Store(req.body);
    store.save()
    .then(() => {
        res.status(201).json({'store': 'store added successfully', 'store_id': store._id});
    })
    .catch(() => {
        res.status(400).send('unable to save store to database');
    });
});

router.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    Store.findById(id, (err, store) => {
        if (err) {
            res.json(err);
        }
        res.json(store);
    });
});

router.post('/update/:id', (req, res) => {
    let id = req.params.id;
    Store.findById(id, (err, store) => {
        if (!store) {
            res.status(400).send('store not found');
        }
        else {
            store.title = req.body.title;
            store.save()
            .then(() => {
                res.json({'message': 'store update complete', 'store_id': store._id});
            })
            .catch(() => {
                res.status(400).send('unable to update store');
            });
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    Store.findByIdAndDelete({ _id: req.params.id }, (err) => {
        if (err) 
            res.json(err);
        else 
            res.json('successfully removed store');
    });
});

router.get('/:id', (req, res) => {
    Store.findById({ _id: req.params.id }, (err, store) => {
        if (err)
            res.json(err);
        else
            res.json(store);
    });
});

module.exports = router;