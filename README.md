# WanderLust — Discover Places, Book Experiences

WanderLust is a web application that demonstrates how a real world travel listing and booking platform can be built with structured workflows, secure authentication, and clear separation between users and property owners.

This project focuses on authentication, protected routes, listing management, reviews, and booking flows, presented in a clean and beginner friendly way so that anyone can explore and understand how a full stack web application works.

---

## Live Website URL on Render

https://wanderlust-u7l2.onrender.com

---

## What this Project is?

WanderLust allows two main types of people to use the same system:

- **Users (Guests)** → People who want to explore destinations, view property listings, book stays, and leave reviews based on their experience.

- **Hosts (Property Owners)** → People who create and manage listings, receive booking requests, and manage their hosted properties.

Both roles use the same platform but see and access different features based on authentication and ownership rules. Strict route protection ensures that users can only modify their own data and hosts can only manage their own listings.

This project is not a commercial product. It is a functional, end-to-end system demo built to showcase how modern web applications handle authentication, sessions, ownership rules, and workflows.

---

## How can you try out the live Website?

Please follow the instructions exactly in this order.

### Option 1: Create a New Account which is Recommended

You can register your own account and explore the platform as a normal user or host.

#### Steps

1. Open the live website: https://wanderlust-u7l2.onrender.com

2. Click on **Signup**

3. Enter:
   - Username
   - Email
   - Password

4. Click **Register**

5. You will be automatically logged in and redirected to the listings page.

From here, you can:
- View all available listings
- Create your own listings
- Book properties
- Leave reviews
- Manage your bookings

---

### What you can do as a Host? Walkthrough

Once you are logged in, you can simulate how a property owner would use WanderLust to manage listings and bookings.

#### Recommended flow:

- **Create a New Listing.** Click on Add New Listing and fill in the details such as title, location, description, price, and image. Submit the form to publish your listing.

- **View Your Listing.** After creation, your listing appears in the main listings page and also belongs to your account as the owner.

- **Edit or Delete the Listing.** Open your listing and use the edit option to update information, or delete it if needed. Only the owner of the listing can perform these actions.

- **Receive Booking Requests.** When another user books your listing, it appears in your My Orders section as a host.

- **Manage Booking Status.** You can view guest information and update the booking status accordingly.

This flow demonstrates how hosts can manage their properties digitally instead of using manual coordination.

---

### Option 2: Explore as a Guest for the Tasks such as Booking & Reviews

As a guest, you can browse properties and place bookings.

#### Steps

1. Open the live website: https://wanderlust-u7l2.onrender.com

2. Login using your account.

3. Browse listings from the homepage.

4. Open any listing to view its details.

---

### What you can do as a Guest?

- **Browse Listings.** View different destinations with images, descriptions, and prices.

- **Book a Property.** Open a listing and place a booking request.

- **View Your Bookings.** Navigate to My Bookings to see all your active and past bookings.

- **Leave Reviews.** Add reviews to listings you have visited to share your experience with others.

This simulates how a real travel or rental platform allows users to explore and interact with hosted properties.

---

## Important Usage Rules Before Testing

Please read carefully to avoid confusion.

### 1. Do NOT use the same browser window for multiple accounts

Authentication is cookie based. If you want to test with different users:

- Use different browsers, or
- Use private / incognito windows.

### 2. Do NOT refresh randomly during login or booking

Allow redirects to complete naturally to avoid session conflicts.

### 3. All data is shared

Since this is a demo deployment:

- Listings
- Reviews
- Bookings

are shared among all users testing the system. Do not upload sensitive personal information.

---

## What This Project Demonstrates

- User authentication with username and password.
- Cookie based session management.
- Protected routes using middleware.
- Ownership based authorization (only owners can edit/delete listings).
- Booking workflow between users and hosts.
- Review system linked to listings.
- Flash messages for user feedback.
- Image uploads with cloud storage.
- Live deployment on Render.

This project is meant to show how things work internally, not just how they look visually.

---

## Tech Stack Used in this Project

### Frontend

- EJS (Embedded JavaScript Templates)
- HTML, CSS
- Bootstrap for styling

### Backend

- Node.js
- Express.js
- Passport.js for authentication
- Express-session for session management

### Database

- MongoDB Atlas which is a cloud database
- Mongoose ODM

### Other Services

- Cloudinary for image storage
- Mapbox for location and maps
- Render for deployment

---

## Project Structure

```
wanderlust/
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
├── README.md
│
├── models/
│   ├── user.js
│   ├── listing.js
│   ├── review.js
│   └── booking.js
│
├── routes/
│   ├── user.js
│   ├── listing.js
│   └── review.js
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── partials/
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
└── middleware.js
```

---

## What to Explore as a Reviewer

If you are reviewing this project, try:

- Creating a new account
- Adding a listing
- Booking a listing
- Leaving a review
- Editing and deleting only your own listings
- Trying to access protected routes without login

You will see how authentication and authorization are enforced.

---

## Project Scope & Version Roadmap (v1)

The current live deployment of WanderLust represents Version 1 (v1) of the platform.

This version focuses on proving the core idea end-to-end, including:

- User authentication
- Listing creation and management
- Booking workflow
- Review system
- Ownership based permissions
- Session based security

These features together demonstrate the complete lifecycle of a travel listing platform, from listing creation to booking and feedback.

---

## Features Planned for Future Versions

Some features are intentionally left for future development:

- Online payment integration
- Location based search and filtering
- Messaging between guests and hosts
- Booking cancellation and refund flows
- Advanced admin dashboard
- Production grade email and notification services

---

## Why This Approach Was Chosen?

By keeping Version 1 focused on core workflows:

- The system remains easy to understand.
- Each feature can be demonstrated clearly.
- The project avoids unnecessary complexity.
- Future improvements can be added incrementally.
- The design mirrors how real platforms evolve from basic functionality to advanced services.

In short: Version 1 proves the workflow works. Future versions make it smarter and more scalable.

---

## Final Notes

This project is best understood by using it, not just reading the code.

If something does not work, it is usually because:

- Cookies were blocked
- Multiple sessions were mixed
- Steps were skipped
- Render was restarting the service

Follow the usage instructions carefully for the best experience.

---

## License

This project is licensed under the MIT License.

---

## Support

If you are exploring this as a student or developer:

- Fork it
- Test it
- Break it
- Learn from it

That is exactly what it is built for.