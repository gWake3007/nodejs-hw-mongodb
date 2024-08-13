import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

// contactSchema.pre('save', function (next) {
//   if (!this.phoneNumber.startsWith('+')) {
//     this.phoneNumber = `+${this.phoneNumber}`;
//   }
//   next();
// });

const Contact = mongoose.model('Contact', contactSchema);

export { Contact };
