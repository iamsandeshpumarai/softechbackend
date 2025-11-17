const express = require('express')
const {
  contentEditHead,
  contentEditSubHead,
  updateBrandPartners,
  editMidSection,
  updateStats,
  getContent,
  updateFooter,
  updateAds,
  updateJourney,
  updateTestimonials
} = require("../Controller/ContentEdit.js");
const upload = require('../middleware/Multer.js')
const router = express.Router()



router.post("/edithead", contentEditHead);
router.post("/editsubhead", contentEditSubHead);

// MID SECTION
router.post("/edit-midsection", editMidSection);

// STATS (MULTIPART)
router.post("/stats", upload.array("images", 20), updateStats);

// BRAND PARTNERS (MULTIPART)
router.post("/brand-partners", upload.array("images", 20), updateBrandPartners);

// ADS SECTION
router.post("/ads", upload.array("images", 20), updateAds);

// JOURNEY SECTION
router.post("/journey", upload.array("images", 10), updateJourney);

// TESTIMONIALS
router.post("/testimonials", upload.array("images", 20), updateTestimonials);

// FOOTER
router.post("/footer", updateFooter);

// GET ALL
router.get("/getcontent", getContent);

module.exports = router;