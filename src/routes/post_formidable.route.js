// Contoh Routing
const express = require('express');
const router = express.Router();

// Controller
const postFormidableController = require('../controllers/api/post_formidable.controller');

// Index
router.get('/', postFormidableController.index);

// Post
router.post('/',  postFormidableController.store);

// Update
router.put('/:_id', postFormidableController.update);

// Delete
router.delete('/:_id', postFormidableController.destroy);

module.exports = router;