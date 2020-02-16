const express = require('express');
const router = express.Router();

let Revenue = require('./revenue.model');

router.get('/', (req, res) => {
    Revenue.find((err, revenues) => {
        if (err) 
            res.json(err);
        else 
            res.json(revenues);
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    Revenue.findById(id, (err, revenue) => {
        if (err)
            res.json(err);
        else
            res.json(revenue);
    });
});

router.post('/add', (req, res) => {
    let revenue = new Revenue(req.body);
    revenue.save()
    .then(() => {
        res.status(201).json({'revenue': 'revenue reported successfully', revenue_id: revenue._id });
    })
    .catch(() => {
        res.status(400).send('unable to create new revenue');
    });
});

router.post('/update/:id', (req, res) => {
    let id = req.params.id;
    Revenue.findById(id, (err, revenue) => {
        if (!store) {
            res.status(400).send('revenue not found');
        }
        else {
            revenue.description = req.body.description;
            revenue.amount = req.body.amount;
            revenue.store = req.body.store;
            revenue.save()
            .then(() => {
                res.json({ 'message': 'revenue update complete', 'revenue_id': revenue._id });
            })
            .catch(() => {
                res.status(400).send('unable to update revenue');
            });
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    Revenue.findByIdAndDelete({ _id: req.params.id }, (err) => {
        if (err) 
            res.json(err);
        else 
            res.json('Successfully removed revenue');
    });
});

router.get('/store/:store_id', (req, res) => {
    Revenue.find({ store: req.params.store_id }, (err, revenues) => {
        if (err)
            res.json(err);
        else 
            res.json(revenues);
    });
});

module.exports = router;