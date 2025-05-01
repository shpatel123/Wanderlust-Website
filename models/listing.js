const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: {
        type: String,
        required: true,
    },
    coordinates: {
        lat: Number,
        lng: Number
      },
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }, 
});

listingSchema.post("findOneAndDelete", async (req, res) => {
    if(listing){
        await Review.deleteMany({reviews: {$_id: listingSchema.reviews}})
    } 
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;