const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

router.post('/', auth, reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.patch('/:id/helpful', reviewController.markHelpful);
router.get('/sort', reviewController.sortReviews);

module.exports = router;
