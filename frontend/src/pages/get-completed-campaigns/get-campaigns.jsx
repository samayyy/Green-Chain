import React, { useState, useContext, useEffect } from "react";
import { Table, Dropdown, DropdownButton, Container } from "react-bootstrap";
import "./get-campaigns.css";
import dataContext from "../../context/DataContext/dataContext";

const statusOptions = ["pending", "approved", "completed"];

const initialArray = [
  { id: 1, name: "Task 1", status: "pending" },
  { id: 2, name: "Task 2", status: "approved" },
  { id: 3, name: "Task 3", status: "completed" },
];

function GetCompletedCampaigns() {
  const [array, setArray] = useState(initialArray);
  const { getCompletedCampaignsByUser } = useContext(dataContext);

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
  async function fetchData() {
    // You can await here
    let data = await getCompletedCampaignsByUser();
    console.log("campaigns:", data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="authority-home">
      <Container>
        <h4 className="my-2">My NFT's</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {array.map((item, key) => (
              <tr key={key}>
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

export default GetCompletedCampaigns;
