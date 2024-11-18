const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const wishSchema = require('../models/WishModel');
const isTableExists = require('../utils/validateTable');

// Getting all based on collectionId (tableName)
router.get('/:collectionId', async (req, res) => {
    const { collectionId } = req.params;

    try {
        // Validate if table (collection) exists
        const exists = await isTableExists(collectionId);
        if (!exists) {
            return res.status(404).json({ error: `Table '${collectionId}' does not exist` });
        }

        // Dynamically create a model for the existing table
        const TableModel = mongoose.model(collectionId, wishSchema, collectionId);

        // Retrieve all data from the table
        const records = await TableModel.find({});
        res.status(200).json({ data: records });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Create dynamic table
router.post('/create/:collectionId', async (req, res) => {
    const { collectionId } = req.params;

    const data = {
        name: 'test01',
        message: 'test01',
        projectId: collectionId
    }

    try {
        // Validate if table (collection) exists
        const exists = await isTableExists(collectionId);
        if (exists) {
            return res.status(400).json({ error: 'Table already exists' });
        }

        // Dynamically create a table
        const TableModel = mongoose.model(collectionId, wishSchema);

        // Add default sample data to the table
        const newDocument = await TableModel.create(data);
        res.status(201).json({ message: 'Data added to table', data: newDocument });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Creating one data
router.post('/add/:collectionId', async (req, res) => {
    const { collectionId } = req.params;
    const data = req.body;

    try {
        const exists = await isTableExists(collectionId);
        if (!exists) {
            return res.status(404).json({ error: `Table '${collectionId}' does not exist` });
        }

        // Dynamically create a model for the existing table
        const TableModel = mongoose.model(collectionId, wishSchema, collectionId);

        // Add data to the table
        const newDocument = await TableModel.create(data);
        res.status(201).json({ message: 'Data added successfully', data: newDocument });
    } catch (error) {
        console.error('Error adding data to table:', error);
        res.status(500).json({ error: 'Error adding data to table' });
    }
})

module.exports = router;