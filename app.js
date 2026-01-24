require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Booking = require("./models/booking.js");
const Listing = require("./models/listing.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const { isLoggedIn } = require("./middleware.js");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const dbUrl = process.env.ATLASDB_URL;

mongoose.connect(dbUrl)
  .then(() => console.log("connected to DB"))
  .catch(err => console.log(err));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  collectionName: "sessions",
});

app.use(session({
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings/:id/reviews", reviewRouter);
app.use("/listings", listingRouter);
app.use("/", userRouter);

app.post("/listings/:id/order", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let newBooking = new Booking({
    guest: req.user._id,
    listing: listing._id,
    host: listing.owner
  });
  await newBooking.save();
  req.flash("success", "Order Placed");
  res.redirect(`/listings/${id}`);
});

app.get("/myOrders", isLoggedIn, async (req, res) => {
  let bookings = await Booking.find({ host: req.user._id })
    .populate("listing")
    .populate("guest");
  res.render("listings/myorders", { bookings });
});

app.get("/mybookings", isLoggedIn, async (req, res) => {
  const bookings = await Booking.find({ guest: req.user._id })
    .populate("listing")
    .populate("host");
  res.render("listings/mybooking", { bookings });
});

app.post("/bookings/:id/status", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  let { status } = req.body;
  let booking = await Booking.findById(id);

  if (booking.host.toString() !== req.user._id.toString()) {
    return res.status(403).send("Unauthorized");
  }

  booking.status = status;
  await booking.save();
  res.redirect(`/mybookings`);
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("./listings/error.ejs", { message });
});

app.listen(port, () => {
  console.log("Server is listening to port 8080");
});