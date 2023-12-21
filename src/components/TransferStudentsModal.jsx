import React, { useState } from 'react';
import { Modal, Button, Form, FormGroup, FormControl } from 'react-bootstrap';

const TransferStudentsModal = ({ isOpen, handleCloseModal,teachers, transferStudents }) => {
  const [selectedTeacher, setSelectedTeacher] = useState('');  
  const handleTransfer = () => {
    // Implement logic to transfer selected students to the selected teacher
    transferStudents(selectedTeacher);
    handleCloseModal();
  };

  return (
    <Modal show={isOpen} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Transfer Students</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <Form.Label>Select Teacher:</Form.Label>
            <FormControl
              as="select"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="" disabled>Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </FormControl>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleTransfer}>
          Transfer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransferStudentsModal;
