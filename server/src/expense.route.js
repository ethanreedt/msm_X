const express = require('express');
const router = express.Router();

let Expense = require('./expense.model');

router.get('/', (req, res) => {
    Expense.find((err, expenses) => {
        if (err) 
            res.json(err);
        else 
            res.json(expenses);
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    Expense.findById(id, (err, expense) => {
        if (err)
            res.json(err);
        else
            res.json(expense);
    });
});

router.post('/add', (req, res) => {
    let expense = new Expense(req.body);
    expense.save()
    .then(() => {
        res.status(201).json({'expense': 'expense reported successfully', expense_id: expense._id });
    })
    .catch(() => {
        res.status(400).send('unable to create new expense');
    });
});

router.post('/update/:id', (req, res) => {
    let id = req.params.id;
    Expense.findById(id, (err, expense) => {
        if (!store) {
            res.status(400).send('expense not found');
        }
        else {
            expense.description = req.body.description;
            expense.amount = req.body.amount;
            expense.store = req.body.store;
            expense.save()
            .then(() => {
                res.json({ 'message': 'expense update complete', 'expense_id': expense._id });
            })
            .catch(() => {
                res.status(400).send('unable to update expense');
            });
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    Expense.findByIdAndDelete({ _id: req.params.id }, (err) => {
        if (err) 
            res.json(err);
        else 
            res.json('Successfully removed expense');
    });
});

router.get('/store/:store_id', (req, res) => {
    Expense.find({ store: req.params.store_id }, (err, expenses) => {
        if (err)
            res.json(err);
        else 
            res.json(expenses);
    });
});

module.exports = router;