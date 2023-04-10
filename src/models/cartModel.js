import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'UsedProduct',
		},
	],
});

const CartModel = mongoose.model('Cart', CartSchema);

export default CartModel;
