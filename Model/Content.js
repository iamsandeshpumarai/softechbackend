const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      default: "",
    },

    // Array of strings
    subHeadings: [
      {
        type: String,
      },
    ],

    // Array of strings
    midSection: [
      {
        type: String,
      },
    ],

    // Array of objects
    stats: [
      {
        title: { type: String },
        description: { type: String },
        image: { type: String },
      },
    ],

    ads: [
      {
        head: { type: String },
        semihead: { type: String },
        content: { type: String },
        image: { type: String },
      },
    ],

    journey: {
      sectionTitle: { type: String },
      items: [
        {
          title: { type: String },
          content: { type: String },
          image: { type: String },
        },
      ],
    },

    testimonials: [
      {
        image: { type: String },
        name: { type: String },
        role: { type: String },
        comment: { type: String },
      },
    ],

    brandPartners: [
      {
        image: { type: String },
      },
    ],

    footerText: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", contentSchema);
