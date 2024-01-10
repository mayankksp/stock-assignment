const express = require("express");
const axios = require("axios");
const nodemailer = require("nodemailer");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const passport = require("passport");
const cookieSession = require("cookie-session");
var flash = require("connect-flash");
const { default: mongoose } = require("mongoose");

require("dotenv").config();

const stockData = require("./data");
const app = express();
app.use(flash());
const allowedOrigins = [
  "http://localhost:5173",
  "https://enchanting-elf-d1a9fe.netlify.app"
];
app.use(
  cors({
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type, Authorization",
})
);
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["lama"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URL);

const apiKey = process.env.STOCK_API_KEY;
const mailPass = process.env.EMAIL_PASS;
//alpha vantage api
const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=${apiKey}`;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "20126@iiitu.ac.in",
    pass: mailPass,
  },
});

app.use(cookieParser());
app.use("/authentication", authRouter);

app.get("/stock/:date", (req, res) => {
  const reqdate = req.params.date;

  const data = stockData;
  // res.send(data);
  const timeSeries = data["Time Series (Daily)"];
  const timeSeriesData = [];
  for (const key in timeSeries) {
    if (key === reqdate)
      timeSeriesData.push({
        date: key,
        open: timeSeries[key]["1. open"],
        high: timeSeries[key]["2. high"],
        low: timeSeries[key]["3. low"],
        close: timeSeries[key]["4. close"],
        volume: timeSeries[key]["5. volume"],
      });
  }
  console.log(timeSeriesData);
  res.send(timeSeriesData);
});

app.get("/stoock/2023-05-15", (req, res) => {
  const data = {
    date: "2023-05-15",
    open: "123.0",
    high: "123.6881",
    low: "122.34",
    close: "123.36",
    volume: "2915725",
  };
  res.send(data);
});

app.post("/send-email", (req, res) => {
  const { stockPrice, recipient } = req.body;
  const message = `The closing stock price of IBM for ${stockPrice.date} is $ ${stockPrice.close}.\n\n The rest of the details is as follows: \nOpen: $ ${stockPrice.open}, \nHigh: $ ${stockPrice.high}, \nLow: $ ${stockPrice.low}, \nVolume: ${stockPrice.volume} \n\nRegards,\nStock Price App`;
  const mailOptions = {
    from: "20126@iiitu.ac.in",
    to: recipient,
    subject: "Stock Price",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log("Email sent:", info.response);
      res.json({ message: "Email sent successfully" });
    }
  });
});

app.post("/send-whatsapp", (req, res) => {
  const { stockPrice, recipient } = req.body;
  const accountSid = "ACe594b17f8e6e7958bcbe0daa06353f81";
  const authToken = process.env.TWILIO_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  const message = `The closing stock price of IBM for ${stockPrice.date} is $ ${stockPrice.close}.\n\nThe rest of the details is as follows: \nOpen: $ ${stockPrice.open}, \nHigh: $ ${stockPrice.high}, \nLow: $ ${stockPrice.low}, \nVolume: ${stockPrice.volume} \n\nRegards,\nStock Price App`;

  client.messages
    .create({
      body: message,
      from: "whatsapp:+14155238886",
      to: "whatsapp:" + recipient,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
  res.json({ message: "Whatsapp sent successfully" });
});

app.listen(process.env.PORT, () => console.log("Server running on port 8000"));
