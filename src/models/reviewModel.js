import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
	reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	rating: { type: Number, required: true },
	comment: { type: String },
});

const ReviewModel = mongoose.model('Review', ReviewSchema);

export default ReviewModel;
