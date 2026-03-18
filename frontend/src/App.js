import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/api/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", salary: "" });
  const [editId, setEditId] = useState(null);

  const fetchEmployees = async () => {
    const res = await axios.get(API);
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API, form);
    }

    setForm({ name: "", role: "", salary: "" });
    fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchEmployees();
  };

  const editEmployee = (emp) => {
    setForm(emp);
    setEditId(emp._id);
  };

  return (
    <div className="container">
      <h1>Employee Management Dashboard</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <input
          placeholder="Salary"
          type="number"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
        />

        <button>{editId ? "Update" : "Add"} Employee</button>
      </form>

      <div className="list">
        {employees.map((emp) => (
          <div className="card" key={emp._id}>
            <h3>{emp.name}</h3>
            <p>{emp.role}</p>
            <p>₹{emp.salary}</p>

            <div className="btns">
              <button onClick={() => editEmployee(emp)}>Edit</button>
              <button onClick={() => deleteEmployee(emp._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;