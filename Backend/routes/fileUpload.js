const express = require("express");
const multer = require("multer");
const csvParser = require("csv-parser");
const { Readable } = require("stream");
const upload = multer({ storage: multer.memoryStorage() });
const CsvRecord = require("../modals/CsvRecord");

const router = express.Router();

// socket io setup
const http = require("http");
const { Server } = require("socket.io");
const { console } = require("inspector");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

router.post("/", (req, res) => {
  upload.single("file")(req, res, (err) => {
    try {
      if (err) {
        console.error("Multer error:", err); // Log the error for debugging
        return res.status(500).json({ error: "File upload failed." });
      }
      if (!req.file) {
        console.error("No file received"); // Log if no file is found
        return res.status(400).json({ error: "No file uploaded." });
      }

      io.on("connection", (socket) => {
        console.log("a user connected", socket.id);
      });
      console.log("socket io............");

      const records = [];
      const readableStream = new Readable();
      readableStream.push(req.file.buffer); // Push the file buffer data to the readable stream
      readableStream.push(null); // Indicate the end of the stream

      // Use csv-parser to process the data in memory
      readableStream
        .pipe(csvParser())
        .on("data", (row) => {
          records.push({
            Date: row.Date,
            Open: parseFloat(row.Open),
            High: parseFloat(row.High),
            Low: parseFloat(row.Low),
            Close: parseFloat(row.Close),
            Volume: parseInt(row.Volume),
            OpenInt: parseInt(row.OpenInt),
          });
        })
        .on("end", async () => {
          // Insert all records into MongoDB
          await CsvRecord.insertMany(records);
          res.send("CSV file data has been saved to MongoDB.");
        });
    } catch (err) {
      console.error("Error processing CSV file:", err);
      res.status(500).send("Error processing CSV file.");
    }

    //   finally {
    //     // Delete the file after processing
    //     console.log("resssssssssss----",req.file.path)
    //     fs.unlinkSync(req.file.path);
    //   }
    console.log("uploaded");
  });
});

module.exports = router;
