const Listing = require("../models/listing");
const axios = require("axios");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Lisitng you requested for does not exit");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  const { location } = req.body.listing;
  const apiKey = "AlzaSyXuhJV5ceQLkB5obiUHpVNCLGcyNW0bKOF"; // Replace with your API key
  const geocodeUrl = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
    location
  )}&key=${apiKey}`;
  const geoResponse = await axios.get(geocodeUrl);
  const coordinates = geoResponse.data.results[0].geometry.location; // Get lat/lng
  const { lat, lng } = coordinates;

  let url = req.file.path;
  let filename = req.file.filename;
  
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  // Add coordinates to the listing
  newListing.coordinates = { lat, lng };

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Lisitng you requested for does not exit");
    res.redirect("/listings");
  }
  originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Delete!");
  res.redirect("/listings");
};

// module.exports.searchListing = async(req, res) => {
//   const { country } = req.query;

//   const results = await Listing.find({
//     country: { $regex: new RegExp(country, 'i') }, // Case-insensitive regex search
//   });
//   res.render("listings/search.ejs", { results });
// };
