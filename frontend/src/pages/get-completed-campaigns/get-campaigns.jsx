import React, { useState, useContext, useEffect } from "react";
import { Table, Dropdown, DropdownButton, Container } from "react-bootstrap";
import "./get-campaigns.css";
import dataContext from "../../context/DataContext/dataContext";
import garbage from "../../images/garbageSeen.jpg";
import pothole from "../../images/potholeSeen.jpg"

const statusOptions = ["pending", "approved", "completed"];

const initialArray = [
  { id: 1, name: "Pothole in Vidyavihar", status: "completed" },
  { id: 2, name: "Garbage in Ghatkopar", status: "completed" },
  { id: 3, name: "Garbage accumulated Kandivali", status: "completed" },
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
              <th>Image</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {array.map((item, key) => (
              <tr key={key}>
                <td>{item.id}</td>
                {index !== 0 ? <td><img style={{ width: "280px" }} src={garbage} alt="gb"></img></td> : <td><img src={pothole} style={{ width: "280px" }} alt="gb"></img></td>}
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
