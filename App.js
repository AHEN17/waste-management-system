import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import FileComplaint from './components/FileComplaint';
import ResolveComplaint from './components/ResolveComplaint';
import RevertResolution from './components/RevertResolution';

function App() {
  return (
    <div className="App">
      <Container>
        <Row className="my-5">
          <Col>
            <h1 className="text-center">Waste Management Complaint Handling System</h1>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FileComplaint />
          </Col>
          <Col md={6}>
            <ResolveComplaint />
          </Col>
        </Row>
        <Row>
          <Col>
            <RevertResolution />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
