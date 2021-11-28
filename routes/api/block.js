const express = require('express');
const router = express.Router();
const block = require('../../Block');
const uuid = require('uuid');

// Get all the block
router.get('/', (req, res) => res.json(block));

// Get single member
router.get('/:id', (req, res) => {
    const found = block.some(block => block.id === parseInt(req.params.id));

    if(found) {
        res.json(block.filter(block => block.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No block with the id of ${req.params.id}` });
    }
    
});

// Create a new block
router.post('/', (req, res) => {
    const newBlock = {
        id: uuid.v4(),
        name: req.body.name,
        zone: req.body.zone,
        start: req.body.start,
        close: req.body.close,
        totalStock: req.body.totalStock,
        invoiceCAD: req.body.invoiceCAD,
        invoiceBTC: req.body.invoiceBTC
    };


    if(!newBlock.name) {
        return res.status(400).json({ msg: 'Please include a block name' });
    }

    block.push(newBlock);
    res.json(block);
})

// Update block
router.put('/:id', (req, res) => {
    const found = block.some(block => block.id === parseInt(req.params.id));

    if(found) {
        const updateBlock = req.body;
        block.forEach(block => {
            if(block.id === parseInt(req.params.id)) {
                block.name = updateBlock.name ? updateBlock.name: block.name;
                block.zone = updateBlock.zone ? updateBlock.zone: block.zone;
                block.start = updateBlock.start ? updateBlock.start: block.start;
                block.close = updateBlock.close ? updateBlock.close: block.close;
                block.totalStock = updateBlock.totalStock ? updateBlock.totalStock: block.totalStock;
                invoiceCAD = updateBlock.invoiceCAD ? updateBlock.invoiceCAD: block.invoiceCAD;
                block.invoiceBTC = updateBlock.invoiceBTC ? updateBlock.invoiceBTC: block.invoiceBTC;
                res.json({ msg: 'Block updated', block});
            }
        })
    } else {
        res.status(400).json({ msg: `No block with the id of ${req.params.id}` });
    }
    
});

// Delete block
router.delete('/:id', (req, res) => {
    const found = block.some(block => block.id === parseInt(req.params.id));

    if(found) {
        res.json({
            msg: 'Block deleted',
            block: block.filter(block => block.id !== parseInt(req.params.id))
        })
    } else {
        res.status(400).json({ msg: `No block with the id of ${req.params.id}` });
    }
    
});

module.exports = router;