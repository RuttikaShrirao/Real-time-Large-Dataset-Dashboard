const Bull = require('bull');
const csvParser = require('csv-parser');
const { Readable } = require('stream');
const CsvRecord = require("./modals/CsvRecord");

// Initialize the same Redis queue for background processing
console.log("csvWorker.js is running");

const csvQueue = new Bull('csv-processing', { redis: { port: 6379, host: '127.0.0.1' } });

// Define the job processing logic
csvQueue.process(async (job) => {
    console.log("Job received in worker:", job.id);
    const records = [];
    const readableStream = new Readable();
    readableStream.push(job.data.fileBuffer);
    console.log(csvQueue,"eeeeeeeeeeeeeeeeeeeeeeee",readableStream)
    readableStream.push(null);

    return new Promise((resolve, reject) => {
        readableStream
            .pipe(csvParser())
            .on('data', (row) => {
                  // Parse each row and add it to the batch
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
            .on('end', async () => {
                await CsvRecord.insertMany(records);
                console.log("CSV data has been saved to MongoDB");
                resolve();
            })
            .on('error', (error) => {
                console.error("Error processing CSV file:", error);
                reject(error);
            });
    });
});
