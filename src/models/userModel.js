import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	profilePic: {
		type: String,
		default:
			'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
	},
	isAdmin: { type: Boolean, default: false },
	isSeller: { type: Boolean, default: false },
	isBuyer: { type: Boolean, default: true },
	storeInfo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Seller',
	},
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
