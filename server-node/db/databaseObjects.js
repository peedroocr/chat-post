const shopSchema = new mongoose.Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('Shop', shopSchema);