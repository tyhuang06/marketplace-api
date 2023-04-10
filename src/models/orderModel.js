import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'UsedProduct',
		},
	],
	total: { type: Number, required: true },
	status: { type: String, required: true },
});

const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;
