import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'UsedProduct',
		},
	],
	totalPrice: { type: Number, required: true },
	shippingAddress: { type: String, required: true },
	status: { type: String, default: 'Pending' },
});

const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;
