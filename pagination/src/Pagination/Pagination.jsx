// src/PaginatedTable.js
import React, { useEffect, useState } from 'react';
import "../Pagination/Pagination.css";

const API_URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'; 
const ROWS_PER_PAGE = 10;

const PaginatedTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');

  

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError('failed to fetch data');
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateTable = () => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = Math.min(startIndex + ROWS_PER_PAGE, data.length);
    return data.slice(startIndex, endIndex);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage * ROWS_PER_PAGE < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
        <h1 style={{textAlign:"center"}}>Employee Data Table</h1>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {updateTable().map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination" style={{display:"flex",justifyContent:"center"}}>
        <button onClick={handlePrevClick} disabled={currentPage === 1}>
          Previous
        </button>
        <button>{currentPage}</button>
        <button onClick={handleNextClick} disabled={currentPage * ROWS_PER_PAGE >= data.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;
