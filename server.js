const express = require('express');
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');

const app = express();
const PORT = 3001;

app.use(express.json());  // To parse JSON data in POST requests

// Route to handle GET requests for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Waste Management System API');
});

app.use(express.json());

let complaintQueue = [];  // Queue for handling complaints
let complaintHistory = [];  // Stack for storing historical complaints

// Helper function to generate a daily log of complaints (CSV format)
function generateCSVLog() {
  const csvWriter = createObjectCsvWriter({
    path: 'daily_log.csv',
    header: [
      { id: 'id', title: 'Complaint ID' },
      { id: 'description', title: 'Description' },
      { id: 'priority', title: 'Priority' },
      { id: 'status', title: 'Status' },
    ],
  });

  csvWriter.writeRecords(complaintHistory)  // Write historical complaints to CSV
    .then(() => console.log('The CSV log has been written successfully.'));
}

// Route to file a complaint
app.post('/file-complaint', (req, res) => {
  const { description, healthRisk, missedPickup, sensitiveArea } = req.body;

  // Assigning priority based on conditions
  let priority = 0;
  if (healthRisk) priority += 3;  // High priority for health risk
  if (missedPickup) priority += 2;  // Medium priority for missed pickups
  if (sensitiveArea) priority += 1;  // Low priority for sensitive areas

  const complaint = {
    id: complaintQueue.length + 1,  // Auto-increment ID
    description,
    priority,
    status: 'Pending',  // Default status
  };

  complaintQueue.push(complaint);
  // Sort complaints by priority (highest priority first)
  complaintQueue.sort((a, b) => b.priority - a.priority);

  res.status(200).json({ message: 'Complaint filed successfully', complaint });
});

// Route to resolve complaint (processes complaints)
app.post('/resolve-complaint', async (req, res) => {
  if (complaintQueue.length === 0) return res.status(400).json({ message: 'No complaints to resolve' });

  // Process the highest priority complaint
  const complaint = complaintQueue.shift();  // Remove the first (highest priority) complaint
  complaint.status = 'Resolved';

  // Push the resolved complaint to history (stack)
  complaintHistory.push(complaint);

  // Generate daily log (CSV)
  generateCSVLog();
  
  res.status(200).json({ message: 'Complaint resolved successfully', complaint });
});

// Route to revert the last complaint resolution (using stack)
app.post('/revert-resolution', (req, res) => {
  if (complaintHistory.length === 0) return res.status(400).json({ message: 'No resolutions to revert' });

  const lastComplaint = complaintHistory.pop();  // Pop the last complaint from the history stack
  complaintQueue.unshift(lastComplaint);  // Add the reverted complaint back to the front of the queue

  res.status(200).json({ message: 'Complaint resolution reverted', complaint: lastComplaint });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
