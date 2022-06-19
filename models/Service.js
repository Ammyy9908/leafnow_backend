const { model, Schema } = require("mongoose");

const service_schema = new Schema({
  service_name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Service = model("Service", service_schema);

module.exports = User;
