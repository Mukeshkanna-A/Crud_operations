import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Button, Container } from "react-bootstrap";
import { API_URL } from "../Constants/URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Read() {
  const [apiData, setAPIData] = useState([]);
  const navigate = useNavigate();

  const updateUser = ({id,firstName,lastName,checked}) => {
    localStorage.setItem("userId", id)
    localStorage.setItem("firstName",firstName)
    localStorage.setItem("lastName",lastName)
    localStorage.setItem("checked",checked)
    navigate("/update")
  }
  const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    alert("Deleted Successfuly");
    callGetAPI();
  };

  const callGetAPI = async () => {
    const resp = await axios.get(API_URL);
    setAPIData(resp.data);
  };

  useEffect(() => {
    callGetAPI();
  }, []);

  return (
    <Container>
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Checked</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody responsive>
          {apiData.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.checked ? "checked" : "Not Checked"}</td>
              <td>
                <Button onClick={() => deleteUser(data.id)}>Delete</Button>
              </td>
              <td>
                <Button onClick={() => updateUser(data)}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Read;
