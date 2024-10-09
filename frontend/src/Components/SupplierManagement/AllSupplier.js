import React from "react";
import SideBar from "../Home/SideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import NotFound from "./img/notfound.jpg";
const URL = "http://localhost:8081/supplier";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
function AllSupplier() {
  const [supplier, setSupplier] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setSupplier(data.supplier));
  }, []);
  const deleteHandler = async (_id) => {
    // Define _id as a parameter
    const confirmed = window.confirm(
      "Are you sure you want to delete this Data?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${URL}/${_id}`); // Correct URL construction
        window.alert(" Delete successfully!");
        window.location.reload();
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting details:", error);
      }
    }
  };
  /*Search Function */
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.supplier.filter((supplier) =>
        Object.values(supplier).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setSupplier(filtered);
      setNoResults(filtered.length === 0);
    });
  };
  /* Report Generation Function */
  const handleGenerateReport = () => {
    const doc = new jsPDF();

    doc.text("supplier Report", 20, 10);

    const columns = [
      "supID",
      "name",
      "email",
      "phone",
      "address",
    ];

    const rows = supplier.map((item) => [
      item.supID,
      item.name,
      item.email,
      item.phone,
      item.address,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
    });

    doc.save("order.pdf");
  };
  return (
    <div>
        <div className="main_function">
        <div>
          <SideBar />
        </div>
        <div className="lef_child">
          <div className="">
            <h1 className="main_topic_function">Supplier Details</h1>
            <div className="action_set">
              <button
                className="function_btn"
                onClick={() => (window.location.href = "/addSupplier")}
              >
                Add New Supplier
              </button>
              <tr>
                <td className="">
                  <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    name="search"
                    className="search_bar"
                    placeholder="Search Here..."
                  ></input>
                </td>

                <td>
                  <button onClick={handleSearch} className="search_btn">
                    Search
                  </button>
                </td>
              </tr>
              <button className="function_btn" onClick={handleGenerateReport}>
                Generate Report
              </button>
            </div>
            <br /> <br />
            {noResults ? (
              <div className="">
                <img src={NotFound} alt="noimg" className="nofoundimg" />
                <p className="nopeara">No Details Found</p>
              </div>
            ) : (
              <div className="table_container">
                <table className="admin_table">
                  <thead>
                    <tr className="">
                      <th className="admin_table_th">Supplier ID</th>
                      <th className="admin_table_th">name</th>
                      <th className="admin_table_th">email</th>
                      <th className="admin_table_th">phone</th>
                      <th className="admin_table_th">address</th>
                    </tr>
                  </thead>

                  <tbody>
                    {supplier.map((item, index) => (
                      <tr className="" key={index}>
                        <td className="admin_table_td">{item.supID}</td>
                        <td className="admin_table_td">{item.name}</td>
                        <td className="admin_table_td">{item.email}</td>
                        <td className="admin_table_td">{item.phone}</td>
                        <td className="admin_table_td">{item.address}</td>
                        <td className="admin_table_td tbl_btn">
                          <Link
                            className="update_btn"
                            to={`/updateSupplier/${item._id}`}
                          >
                            Update
                          </Link>
                          <button
                            onClick={() => deleteHandler(item._id)}
                            className="dltbtn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllSupplier
