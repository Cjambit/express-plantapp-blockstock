const express = require('express');
const router = express.Router();
const stock = require('../../Stock');
const uuid = require('uuid');

// Get all the stock
router.get('/', (req, res) => res.json(stock));

// Get single member
router.get('/:id', (req, res) => {
    const found = stock.some(stock => stock.id === parseInt(req.params.id));

    if(found) {
        res.json(stock.filter(stock => stock.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No stock with the id of ${req.params.id}` });
    }
    
});

// Create a new stock
router.post('/', (req, res) => {
    const newStock = {
        id: uuid.v4(),
        name: req.body.name,
        reqKey: req.body.reqKey,
        contract: req.body.contract,
        bundle: req.body.bundle
    };

    if(!newStock.name || !newStock.reKey) {
        return res.status(400).json({ msg: 'Please include a stock name and a request key' });
    }

    stock.push(newStock);
    res.json(stock);
})

// Update stock
router.put('/:id', (req, res) => {
    const found = stock.some(stock => stock.id === parseInt(req.params.id));

    if(found) {
        const updateStock = req.body;
        stock.forEach(stock => {
            if(stock.id === parseInt(req.params.id)) {
                stock.name = updateStock.name ? updateStock.name: stock.name;
                stock.reqKey = updateStock.reqKey ? updateStock.reqKey: stock.reqKey;
                
                res.json({ msg: 'Stock updated', stock});
            }
        })
    } else {
        res.status(400).json({ msg: `No stock with the id of ${req.params.id}` });
    }
    
});

// Delete stock
router.delete('/:id', (req, res) => {
    const found = stock.some(stock => stock.id === parseInt(req.params.id));

    if(found) {
        res.json({
            msg: 'Stock deleted',
            stock: stock.filter(stock => stock.id !== parseInt(req.params.id))
        })
    } else {
        res.status(400).json({ msg: `No stock with the id of ${req.params.id}` });
    }
    
});

module.exports = router;