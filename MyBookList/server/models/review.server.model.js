const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let reviewSchema = new Schema({
    bookId: {type: String, required: true},
    username: {type: String, required: true},
    bookName: {type: String, required: true},
    subject: {type: String, required: true},
    content: { type: String, required: true },
    rating: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
});

reviewSchema.statics = {
    findAll() {
        return new Promise((resolve, reject) => {
            this.find({}, (err, reviews) => {
                if(!err) {
                    resolve(reviews);
                } else {
                    reject(err);
                }
            });
        });
    }
};

var Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
