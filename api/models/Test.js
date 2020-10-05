const mongoose = require("mongoose");


const testSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    title: { type: String, default: 'Test' },
    name: { type: String, default: 'Victor Ryabkov' },
    age: { type: Number, default: 20 },
    date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('TestSchema', testSchema);