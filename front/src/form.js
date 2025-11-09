import React, { useState, useEffect  } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function Form() {
    const [form, setForm] = useState({ name: "", dob: "", message: "" });
    const [status, setStatus] = useState("");
    const [dataList, setDataList] = useState([]); // store data from MongoDB

    // Handle input changes
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle form submit
    const handleSubmit = async e => {
        e.preventDefault();
        try {
        await axios.post("http://localhost:5000/api/form", form);
        setStatus("✅ Data submitted successfully!");
        setForm({ name: "", dob: "", message: "" });
        fetchData(); // refresh list after submit
        } catch (error) {
        console.error(error);
        setStatus("❌ Failed to submit data");
        }
    };
    // Fetch all data from backend
    const fetchData = async () => {
        try {
        const res = await axios.get("http://localhost:5000/api/form");
        setDataList(res.data);
        } catch (err) {
        console.error("Error fetching data:", err);
        }
    };

    // Load data on page load
    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 border-0" style={{ width: "24rem", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Contact Us</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">DOB</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your DOB"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="form-control"
              rows="4"
              placeholder="Write your message..."
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
            Send Message
          </button>
        </form>
        {status && (
          <div className="alert alert-info text-center mt-3 py-2" role="alert">
            {status}
          </div>
        )}
      </div>

     {/* Display Data */}
      <div className="mt-5" style={{marginLeft:"5%"}}>
        <h4 className="text-center mb-3 text-secondary">Submitted Data</h4>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>DOB</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {dataList.length > 0 ? (
                dataList.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{new Date(item.dob).toLocaleDateString()}</td>
                    <td>{item.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div> 
  );
}

export default Form;
