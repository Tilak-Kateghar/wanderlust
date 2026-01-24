const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema}=require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const mongoose=require("mongoose");
const {isLoggedIn, isOwner, validateListing}=require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geoCodingClient = mbxGeocoding({ accessToken: mapToken });


const upload = multer({ storage });

//create add route 
router.post("/",isLoggedIn,  upload.single("listing[image]"), validateListing, wrapAsync(async (req, res)=>{
    let response=await geoCodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    })
    .send();
    let url=req.file.path;
    let filename=req.file.filename;

    let listing = req.body.listing;
    let newListing = new Listing(listing);
    newListing.owner=req.user._id;
    newListing.image={url, filename}

    newListing.geometry=response.body.features[0].geometry;

    let savedListing= await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}));
//all listings
router.get("/", wrapAsync(async (req, res)=>{ 
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
}));

router.get("/new", isLoggedIn ,(req, res)=>{
    res.render("./listings/new.ejs");
});

router.get("/:id", wrapAsync(async (req, res)=>{
    let {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ExpressError(400, "Invalid Listing ID");
    }
    let listing=await Listing.findById(id)
    .populate({
        path: "reviews", 
        populate:{ 
            path: "author"
        }, 
    })
    .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for, does not exists!")
        return res.redirect("/listings")
    }
    res.render("./listings/show.ejs", {listing});
}))

router.put("/:id", isLoggedIn, isOwner ,upload.single("listing[image]") ,validateListing,wrapAsync(async(req, res)=>{
    let {id}=req.params
    let listing=req.body.listing;
    await Listing.findByIdAndUpdate(id, listing);

    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url, filename}
    
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}));

router.get("/:id/edit", isLoggedIn,isOwner , wrapAsync(async(req, res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for, does not exists!")
        return res.redirect("/listings")
    }
    let originalImage=listing.image.url;
    originalImage=originalImage.replace("/upload", "/upload/w_250")
    res.render("./listings/edit.ejs", {listing, originalImage});
}));

router.delete("/:id", isLoggedIn,isOwner , wrapAsync(async(req, res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}));

module.exports=router;