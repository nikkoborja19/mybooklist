const Review = require("../models/review.server.model.js");

exports.getAll = function(req, res) {

    Review.findAll()
        .then((reviews) => {
            return res.status(200).json(reviews);
        })
        .catch((error) => {
            console.log(error);
            return res.status(400).send();
        });
}

exports.getAllBookReviews = function(req, res) {
    let query = {
      bookId: req.params.bookId+""
    }

    Review.find(query)
        .then((reviews) => {
            return res.status(200).json(reviews);
        })
        .catch((error) => {
            console.log(error);
            return res.status(400).send();
        });
}

exports.getById = function(req, res) {

    Review.findById(req.params.reviewId+"", function(err, review) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        } else {
            return res.status(200).send(review);
        }
    });
}

exports.create = function(req, res) {
    let review = new Review(req.body);

    review.save((err, review) => {
        if(err) {
            console.log(err);
            return res.status(500).send();
        } else {
            return res.status(204).send();
        }
    });
}

exports.delete = function(req, res) {
    console.log(req.params.reviewId);

    Review.findByIdAndRemove(req.params.reviewId, function(err, data) {
        if(!err) {
            res.status(204).send();
        } else {
            res.status(500).send();
        }
    });
}

exports.update = function(req, res) {
    console.log(req.params.reviewId);
    let review = {
        subject: req.body.subject,
        content: req.body.content,
        rating: req.body.rating
    }

    Review.findByIdAndUpdate(req.params.reviewId, review, function(err, data) {
        if(!err) {
            res.status(204).send();
        } else {
            res.status(500).send();
        }
    })
}
