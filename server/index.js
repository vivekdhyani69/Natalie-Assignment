const express = require("express");
const mongoose = require("./db/db");
const Sum = require("./model/sumModel"); // Import the Sum model
const Concatenation = require("./model/appendString"); // Import the Sum model
const Upload = require("./model/countWords"); // Import the Sum model
const multer = require("multer");
const pdfParse = require("pdf-parse");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const app = express();
const PORT = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Define POST route to handle sum calculation and save to MongoDB
app.post("/sumcalculate", async (req, res) => {
  console.log("Received POST request:", req.body);
  try {
    const num1 = parseInt(req.body.num1); // Parse num1 as an integer
    const num2 = parseInt(req.body.num2); // Parse num2 as an integer

    const sum = num1 + num2;

    // Save the sum to the database
    const sumRecord = new Sum({
      num1,
      num2,
      sum,
    });
    await sumRecord.save();

    res.status(201).json({ sum });
  } catch (error) {
    console.error("Error calculating and saving sum:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/concatenate", async (req, res) => {
  const { string1, string2 } = req.body;
  const result = `${string1} ${string2}`;

  // Save the result to MongoDB (optional, but recommended)
  const concatenationRecord = new Concatenation({ string1, string2, result });
  await concatenationRecord.save();

  res.json({ result });
});

///file upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("pdf"), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("Please upload a PDF file.");
  }

  try {
    const dataBuffer = require("fs").readFileSync(`uploads/${file.filename}`);
    const data = await pdfParse(dataBuffer);

    // Extract text content from the PDF and send it as response
    const pdfText = data.text;
    // Count words (excluding spaces) in the PDF text
    const wordCount = pdfText
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const message = "Data Read Successffuly";
    const status = true;
    // Send the word count in the response
    res.send({ message, status, wordCount, pdfText });
  } catch (error) {
    const status = false;
    console.error(error);
    const message = "Error! Please choose valid file format";
    res.status(500).send({ status, message });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
