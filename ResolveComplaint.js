import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Alert } from 'react-bootstrap';

const ResolveComplaint = () => {
  const [message, setMessage] = useState('');

  const handleResolve = async () => {
    try {
      const response = await axios.post('http://localhost:3001/resolve-complaint');
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error resolving the complaint. Please try again.');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Resolve Complaint</Card.Title>
        {message && <Alert variant="info">{message}</Alert>}
        <Button variant="success" onClick={handleResolve}>
          Resolve Complaint
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ResolveComplaint;
