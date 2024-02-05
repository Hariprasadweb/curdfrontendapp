import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

export default function Home() {
    const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/emp/getAll");
    setUsers(result.data);
    console.log(result);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/emp/delete/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
        <div className='py-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">NAME</th>
      <th scope="col">DEPARTMENT</th>
      <th scope="col">SALARY</th>
      <th scope="col">ACTIONS</th>
    </tr>
  </thead>
  <tbody>
  {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.name}</td>
                <td>{user.department}</td>
                <td>{user.salary}</td>
                <td>
                  <Link className="btn btn-primary mx-2"
                  to={`/viewuser/${user.id}`}
                  >view</Link>
                  <Link className="btn btn-outline-primary mx-2"
                  to={`/edituser/${user.id}`}
                  >Edit</Link>
                  <button className="btn btn-danger mx-2"
                   onClick={() => deleteUser(user.id)}
                  >delete</button>
                </td>
              </tr>
            ))}
 
  </tbody>
</table>
        </div>

    </div>
  )
}
