// Controller/ContentEdit.js
const contentModel = require("../Model/Content");
const CONTENT_ID = "6916d955a91cabab52d1e3ee";

/* ---------- TEXT ONLY ---------- */
exports.contentEditHead = async (req, res) => {
  try {
    const updated = await contentModel.findByIdAndUpdate(CONTENT_ID, { heading: req.body.text }, { new: true });
    res.json({ message: "Heading updated", data: updated });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.contentEditSubHead = async (req, res) => {
  try {
    const updated = await contentModel.findByIdAndUpdate(CONTENT_ID, { subHeadings: req.body.text }, { new: true });
    res.json({ message: "Subheadings updated", data: updated });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.editMidSection = async (req, res) => {
  try {
    const updated = await contentModel.findByIdAndUpdate(CONTENT_ID, { midSection: req.body.midSection }, { new: true });
    res.json({ message: "Mid section updated", data: updated });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.updateFooter = async (req, res) => {
  try {
    const updated = await contentModel.findByIdAndUpdate(CONTENT_ID, { footerText: req.body.text }, { new: true });
    res.json({ message: "Footer updated", data: updated });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

/* ---------- MULTIPART ---------- */
const buildArray = (req, fields) => {
  const length = req.body[fields[0]].length;
  const result = [];

  for (let i = 0; i < length; i++) {
    const obj = {};
    fields.forEach(f => (obj[f] = req.body[f][i] || ""));
    const fileIdx = req.body.imageIndices?.indexOf(i.toString());
    obj.image = fileIdx > -1 ? req.files[fileIdx].path : (req.body.existingImages?.[i] || "");
    result.push(obj);
  }
  return result;
};

exports.updateBrandPartners = async (req, res) => {
  try {
    console.log("FILES:", req.files);

    const imgLinks = (req.files || []).map(f => ({
      image: f.path   // USE PATH INSTEAD OF secure_url
    }));

    const updated = await contentModel.findByIdAndUpdate(
      CONTENT_ID,
      { brandPartners: imgLinks },
      { new: true }
    );

    res.json({ message: "Brand partners updated", data: updated });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


exports.updateStats = async (req, res) => {
  console.log(req.body)
  console.log(req.files)
  console.log("this is mine updtestats")
console.log(req.body.title.length>=2,'s the updatestats')
  try {
    let stats ; 
    if(Array.isArray(req.body.title)  ) { stats = buildArray(req, ['title', 'description']);}
    
    else {
       stats = [{title :req.body.title ,description:req.body.description}]
    }
    
        const updated = await contentModel.findByIdAndUpdate(CONTENT_ID, { stats }, { new: true });
    console.log(updated,"updated")
    res.json({ message: "Stats updated", data: updated });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.updateAds = async (req, res) => {
  console.log(req.files)
  console.log("we are in the updateads")
  try {
    const ads = buildArray(req, ['head', 'semihead', 'content']);
    const updated = await contentModel.findByIdAndUpdate(CONTENT_ID, { ads }, { new: true });
    res.json({ message: "Ads updated", data: updated });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.updateJourney = async (req, res) => {
  console.log(req.body)
  console.log(req.files)
  console.log("updatedjourney")
  console.log(Array.isArray(req.body.title) ,"is it true")
  try {
    const { sectionTitle } = req.body;

       let items ; 
    if(Array.isArray(req.body.title)) { items = buildArray(req, ['title', 'content']);}
    
    else {
       items = [{title :req.body.title ,content:req.body.content,image:req.files[0].path}]
    }

 
    const updated = await contentModel.findByIdAndUpdate(CONTENT_ID, { journey: { sectionTitle, items:items } }, { new: true });
    console.log(updated,"brother its updted")
    res.json({ message: "Journey updated", data: updated });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.updateTestimonials = async (req, res) => {
  console.log(req.body)
  console.log(req.files)
  try {
let testimonials ;
    if(Array.isArray(req.body.name)){testimonials = buildArray(req, ['name', 'role', 'comment']);}
else{
  testimonials = [{name:req.body.name,role:req.body.role,comment:req.body.comment,image:req.files[0].path}] 
}
    const updated = await contentModel.findByIdAndUpdate(CONTENT_ID, { testimonials }, { new: true });
    res.json({ message: "Testimonials updated", data: updated });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

/* ---------- GET ---------- */
exports.getContent = async (req, res) => {
  try {
    const data = await contentModel.findOne({ _id: CONTENT_ID });
    res.json({ data: [data] });
  } catch (e) { res.status(500).json({ error: e.message }); }
};