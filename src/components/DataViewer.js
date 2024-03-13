// src/DataViewer.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection,  addDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import './DataViewer.css';
import { mirage } from 'ldrs'

mirage.register()


const DataViewer = () => {
  const [enrollmentLoading, setEnrollmentLoading] = useState(true);
  const [documentsRequestLoading, setDocumentsRequestLoading] = useState(true);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [documentsRequestData, setDocumentsRequestData] = useState([]);

  const fetchData = async () => {
    setEnrollmentLoading(true);
    setDocumentsRequestLoading(true);

    // Fetch Enrollment Data
    const enrollmentDataCollection = collection(db, 'enrollmentData');
    const enrollmentDataSnapshot = await getDocs(query(enrollmentDataCollection, orderBy('ticketNumber')));
    const enrollmentDataList = enrollmentDataSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch Documents Request Data
    const documentsRequestCollection = collection(db, 'documentsRequest');
    const documentsRequestSnapshot = await getDocs(query(documentsRequestCollection, orderBy('ticketNumber')));
    const documentsRequestList = documentsRequestSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setEnrollmentData(enrollmentDataList);
    setDocumentsRequestData(documentsRequestList);

    setEnrollmentLoading(false);
    setDocumentsRequestLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteTicket = async (ticketData, collectionName) => {
    try {
      if (collectionName === 'enrollmentData') {
        setEnrollmentLoading(true);
      } else if (collectionName === 'documentsRequest') {
        setDocumentsRequestLoading(true);
      }

      // Remove data from the current collection
      const currentCollection = collection(db, collectionName);
      const documentRef = doc(currentCollection, ticketData.id);
      await deleteDoc(documentRef);

      fetchData(); // Fetch updated data

    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <div className="data-viewer-container">
      <div className="data-section">
        <h2>Enrollment Data</h2>
        {enrollmentLoading && <div className="loading-animation-container"><l-mirage
              size="60"
              speed="2.5" 
              color="black" 
            ></l-mirage></div>}
        {!enrollmentLoading && enrollmentData.map((data, index) => (
          <div key={index} className="data-item">
            <h3>Ticket {data.ticketNumber}</h3>
            <p><strong>Student Number:</strong> {data.studentNumber}</p>
            <p><strong>Year Level:</strong> {data.yearLevel}</p>
            <p><strong>Section:</strong> {data.section}</p>
            <p><strong>Semester:</strong> {data.semester}</p>
            <p><strong>Program:</strong> {data.program}</p>
            <button onClick={() => handleDeleteTicket(data, 'enrollmentData')}>DONE: Delete Ticket</button>
          </div>
        ))}
      </div>

      <div className="data-section">
        <h2>Documents Request Data</h2>
        {documentsRequestLoading && <div className="loading-animation-container"><l-mirage
              size="60"
              speed="2.5" 
              color="black" 
            ></l-mirage></div>}
        {!documentsRequestLoading && documentsRequestData.map((data, index) => (
          <div key={index} className="data-item">
            <h3>Ticket {data.ticketNumber}</h3>
            <p><strong>Student Number:</strong> {data.studentNumber}</p>
            <p><strong>Year Level:</strong> {data.yearLevel}</p>
            <p><strong>Program:</strong> {data.program}</p>
            <p><strong>Document to Request:</strong> {data.documentToRequest}</p>
            <button onClick={() => handleDeleteTicket(data, 'documentsRequest')}>DONE: Delete Ticket</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataViewer;