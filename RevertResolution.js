import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Alert } from 'react-bootstrap';

const RevertResolution = () => {
  const [message, setMessage] = useState('');

  const handleRevert = async () => {
    try {
      const response = await axios.post('http://localhost:3001/revert-resolution');
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error reverting the resolution. Please try again.');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Revert Last Resolution</Card.Title>
        {message && <Alert variant="info">{message}</Alert>}
        <Button variant="warning" onClick={handleRevert}>
          Revert Resolution
        </Button>
      </Card.Body>
    </Card>
  );
};

export default RevertResolution;
