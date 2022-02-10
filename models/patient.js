const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const patientSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

patientSchema.methods.generateAuthToken = async function () {
  const patient = this;
  const token = jwt.sign({ _id: patient._id.toString() }, process.env.SECRET);
  patient.tokens = patient.tokens.concat({ token });
  await patient.save();
  return token;
};

patientSchema.methods.toJSON = function () {
  const patient = this;
  const patientObject = patient.toObject();
  delete patientObject.password;
  delete patientObject.tokens;
  return patientObject;
};
patientSchema.statics.findByCredentials = async (email, password) => {
  const patient = await Patient.findOne({ email });

  if (!patient) {
    throw new Error("unable to login");
  }
  const isMatch = await bcrypt.compare(password, patient.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return patient;
};

// has plain text password
patientSchema.pre("save", async function (next) {
  const patient = this;
  if (patient.isModified("password")) {
    patient.password = await bcrypt.hash(patient.password, 8);
  }
  next();
});
const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;
