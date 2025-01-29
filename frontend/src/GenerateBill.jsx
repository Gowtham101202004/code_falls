import React from "react";
import "./GenerateBill.css";
import { jsPDF } from "jspdf";

const GenerateBill = ({ order, onClose }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFont("helvetica", "normal");
    
    doc.text("Order Bill", 20, 20);
    
    doc.text(`Username: ${order.username}`, 20, 30);
    doc.text(`Placed On: ${order.createdAt}`, 20, 40);
    doc.text(`Address: ${order.address}`, 20, 50);
    doc.text(`Products: ${order.products}`, 20, 60);
    doc.text(`Amount: ₹${order.amount}`, 20, 70);
    doc.text(`Payment Type: ${order.type}`, 20, 80);
    doc.text(`Expected Arrival: ${order.arrivalDate}`, 20, 90);

    doc.save("order-bill.pdf");
  };

  return (
    <div className="bill-overlay">
      <div className="bill-container">
        <h2>Order Bill</h2>
        <div className="bill-details">
          <p><strong>Username:</strong> {order.username}</p>
          <p><strong>Placed On:</strong> {order.createdAt}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Products:</strong> {order.products}</p>
          <p><strong>Amount:</strong> ₹{order.amount}</p>
          <p><strong>Payment Type:</strong> {order.type}</p>
          <p><strong>Expected Arrival:</strong> {order.arrivalDate}</p>
        </div>
        <button className="download-btn" onClick={generatePDF}>Download PDF</button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default GenerateBill;
