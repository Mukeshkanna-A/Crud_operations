import React, {useState} from "react";
import { Container, Form, Button } from "react-bootstrap";
import { API_URL } from "../Constants/URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateUser() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName") || "");
  const [lastName, setLastName] = useState(localStorage.getItem("lastName") || "");
  const [checked, setChecked] = useState(localStorage.getItem("checked") === "true");

  const updateUser = async () => {
    try {
      const response = await axios.put(`${API_URL}/${userId}`, {
        firstName,
        lastName,
        checked,
      });
      alert("User updated successfully");
      console.log("User updated successfully", response.data);
      navigate("/read");
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <Container>
      <h2 style={{textAlign:"center",paddingBottom:"3rem",fontWeight:"bolder"}}>Update User</h2>
      <Form style={{backgroundColor:"gray",fontWeight:"bold",padding:"2rem"}}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="checked">
          <Form.Check
            type="checkbox"
            label="Checked"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </Form.Group>

        <Button variant="success" onClick={updateUser}>
          Update
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateUser;
