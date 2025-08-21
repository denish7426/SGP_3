import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const CompanyDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(setEmployees);

    socket.on('employeeUpdate', (data) => {
      setEmployees(data);
    });

    return () => socket.disconnect();
  }, []);

  const handleSendMail = (employee) => {
    setSelected(employee);
    setShowEmailModal(true);
  };

  return (
    <div className="flex min-h-screen">
      {/* Employee List */}
      <div className="w-1/3 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Employees</h2>
        <ul>
          {employees.map(emp => (
            <li key={emp._id} className="mb-2 flex justify-between items-center">
              <span>{emp.firstName} {emp.lastName}</span>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleSendMail(emp)}
              >
                Mail
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Profile View */}
      <div className="flex-1 p-8">
        {selected ? (
          <div>
            <h2 className="text-2xl font-bold">{selected.firstName} {selected.lastName}</h2>
            <p>Email: {selected.email}</p>
            <p>Role: {selected.currentRole}</p>
            {/* Add more profile info here */}
          </div>
        ) : (
          <p>Select an employee to view profile.</p>
        )}
      </div>
      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-2">Send Email to {selected.email}</h3>
            {/* Add email form here */}
            <button onClick={() => setShowEmailModal(false)} className="mt-4 text-blue-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;