var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChildImage = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true},
});

    GalleryItemSchema = new Schema({
        mainImageName: { type: String, required: true },
        mainImageUrl: { type: String, required: true},
        hoverText: { type: String, required: true},
        fullDescription: { type: String, required: true },
        childrenImages:  [ChildImage]
    });

module.exports = mongoose.model('GalleryItem', GalleryItemSchema);