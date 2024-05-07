import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: [true, "Please provide a option"],
    minlength: 1,
  },
  createdAt: {
    type: Date,
    // default: Date.now,
  },
});

const Option = mongoose.models.option || mongoose.model("option", optionSchema);

export default Option;
