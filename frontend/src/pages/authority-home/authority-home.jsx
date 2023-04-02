import React, { useState } from "react";
import { Table, Dropdown, DropdownButton, Container } from "react-bootstrap";
import "./authority-home.css";

const statusOptions = ["pending", "approved", "completed"];

const initialArray = [
  { id: 1, name: "Potholes problem", status: "pending" },
  { id: 2, name: "Env Problems", status: "approved" },
  { id: 3, name: "Garbage accumulated Kandivali", status: "pending" },
];

function AuthorityHome() {
  const [array, setArray] = useState(initialArray);

  const handleStatusChange = (id, newStatus) => {
    const newArray = array.map((item) => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      } else {
        return item;
      }
    });
    setArray(newArray);
  };

  return (
    <div className="authority-home">
      <Container>
        <h4 className="my-2">Complaints</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {array.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <DropdownButton
                    id={`status-dropdown-${item.id}`}
                    title={item.status}
                  >
                    {statusOptions.map((option) => (
                      <Dropdown.Item
                        key={`${item.id}-${option}`}
                        onClick={() => handleStatusChange(item.id, option)}
                      >
                        {option}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default AuthorityHome;
