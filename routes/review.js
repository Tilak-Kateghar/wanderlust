const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {reviewSchema}=require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const mongoose=require("mongoose");
const {validateReview, isReviewAuthor, isLoggedIn}=require("../middleware.js");

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async(req, res)=>{
    let {id, reviewId}=req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
}));

router.post("/", validateReview, wrapAsync(async(req, res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    let result=await listing.save();

    console.log(result);
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${req.params.id}`)

}));

module.exports=router;