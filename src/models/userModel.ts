import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Please provide an email address"],
		unique: true,
		minlength: 3,
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minlength: 5,
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		required: [true, "Please provide a role"],
	},
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
