var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SlideshowImage = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true},
});

    PortfolioItemSchema = new Schema({
        mainImageName: { type: String, required: true },
        mainImageUrl: { type: String, required: true},
        hoverText: { type: String, required: true},
        fullDescription: { type: String, required: true },
        slideshowImages:  [SlideshowImage]
    });

module.exports = mongoose.model('PortfolioItem', PortfolioItemSchema);