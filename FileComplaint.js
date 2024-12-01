import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Alert } from 'react-bootstrap';

const FileComplaint = () => {
  const [description, setDescription] = useState('');
  const [healthRisk, setHealthRisk] = useState(false);
  const [missedPickup, setMissedPickup] = useState(false);
  const [sensitiveArea, setSensitiveArea] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const complaintData = {
      description,
      healthRisk,
      missedPickup,
      sensitiveArea,
    };

    try {
      const response = await axios.post('http://localhost:3001/file-complaint', complaintData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error filing the complaint. Please try again.');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>File a Complaint</Card.Title>
        {message && <Alert variant="info">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter complaint description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formHealthRisk">
            <Form.Check
              type="checkbox"
              label="Health Risk"
              checked={healthRisk}
              onChange={(e) => setHealthRisk(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="formMissedPickup">
            <Form.Check
              type="checkbox"
              label="Missed Pickup"
              checked={missedPickup}
              onChange={(e) => setMissedPickup(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="formSensitiveArea">
            <Form.Check
              type="checkbox"
              label="Sensitive Area"
              checked={sensitiveArea}
              onChange={(e) => setSensitiveArea(e.target.checked)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            File Complaint
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FileComplaint;
