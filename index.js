const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const bookingRoute = require("./routes/bookingRoute"); // Import booking routes
const { connectDB } = require("./config/db");
const i18next = require("i18next");
const path = require("path")

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

i18next.init({
  lng: 'hi', 
  fallbackLng: 'en', 
  resources: {
    en: {
      translation: {
        MESSAGE: "Hello",
      }
    },
    hi: {
      translation: {
        MESSAGE: "संदेश",
      }
    }
  }
});

app.get("/i18n",(req,res)=>{
  res.send(i18next.t('MESSAGE'))
})

// User routes
app.use("/user", userRoute);

// Product routes
app.use("/product", productRoute);

// Booking routes
app.use("/booking", bookingRoute); 
app.listen(4500, () => {
  console.log(`Server is running on port 4500`);
});
