const Review = require('../models/Review');

exports.createReview = async (req, res) => {
    const { landlord, environment, amenities, images, videos } = req.body;
    const userId = req.user.id;
    try {
        const reviewId = await Review.create(userId, landlord, environment, amenities, images, videos);
        res.status(201).json({ message: 'Review added successfully', reviewId });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.markHelpful = async (req, res) => {
    const reviewId = req.params.id;
    try {
        const success = await Review.incrementHelpfulCount(reviewId);
        if (success) {
            res.status(200).json({ message: 'Review marked as helpful' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.sortReviews = async (req, res) => {
    const { sortBy } = req.body;
    try {
        const reviews = await Review.sortBy(sortBy);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
