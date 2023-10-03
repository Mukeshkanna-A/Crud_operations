import React,{useState} from 'react';
import axios from 'axios';
import {API_URL} from '../Constants/URL';
import {Form,Row,Col,Button}from 'react-bootstrap';
import '../styled/create.css';
import {useNavigate} from 'react-router-dom';


function Create() {
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [checked,setChecked] = useState(false);
  const navigate = useNavigate();

  const postData = async(e) =>{
    e.preventDefault();
       await axios.post(`${API_URL}`,{
          firstName,
          lastName,
          checked
        })
        navigate('/read');
  }

  return (
    <div>
      <Form className='form' style={{backgroundColor:"gray",padding:"2rem"}}>
      <Row>
        <Form.Group as={Col} controlId="formFirstName">
          <Form.Label style={{fontWeight:"bold"}}>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={event => setFirstName(event.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formLastName">
          <Form.Label style={{fontWeight:"bold"}}>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={event => setLastName(event.target.value)}/>
        </Form.Group>
      </Row>
      <br />

      <Form.Check aria-label="option 1" label="Agree the Terms & Conditions" checked={checked} onChange={() => setChecked(!checked)} style={{fontWeight:"bold"}}/><br />

      <Button variant="primary" type="submit" onClick={postData}>
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default Create;