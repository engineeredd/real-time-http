"use client";

import Image from "next/image";
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);

  // Initialize the WebSocket connection to the backend server
  const socket = io('http://localhost:3001');

  useEffect(() => {
    // Fetch initial data from the backend API
    async function fetchInitialData() {
      try {
        const res = await axios.get('http://localhost:3001/responses');
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchInitialData();

    // Listen for real-time updates from WebSocket
    socket.on('new-data', (newData) => {
      fetchInitialData();
      setData((prevData) => [newData, ...prevData]);
    });

    // Cleanup the WebSocket listener on component unmount
    return () => {
      socket.off('new-data');
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">HTTP Monitoring Dashboard</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Timestamp</th>
            <th className="border px-4 py-2">Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">
                {new Date(item.timestamp).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                {JSON.stringify(item.payload)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}