import React from "react";
import SideBar from "../Home/SideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import NotFound from "./img/notfound.jpg";
const URL = "http://localhost:8081/order";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
function AllOrder() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setOrder(data.order));
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
      const filtered = data.order.filter((order) =>
        Object.values(order).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setOrder(filtered);
      setNoResults(filtered.length === 0);
    });
  };
  /* Report Generation Function */
  const handleGenerateReport = () => {
    const doc = new jsPDF();

    doc.text("order Report", 20, 10);

    const columns = [
      "OrderID",
      "SupplierID",
      "SupplierName",
      "QuantityOrder",
      "total",
    ];

    const rows = order.map((item) => [
      item.OrderID,
      item.SupplierID,
      item.SupplierName,
      item.QuantityOrder,
      item.total,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
    });

    doc.save("order.pdf");
  };
  return (
    <div>
      {" "}
      <div className="main_function">
        <div>
          <SideBar />
        </div>
        <div className="lef_child">
          <div className="">
            <h1 className="main_topic_function">Order Details</h1>
            <div className="action_set">
              <button
                className="function_btn"
                onClick={() => (window.location.href = "/addOrder")}
              >
                Add New Order
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
                      <th className="admin_table_th">OrderID</th>
                      <th className="admin_table_th">SupplierID</th>
                      <th className="admin_table_th">SupplierName</th>
                      <th className="admin_table_th">QuantityOrder</th>
                      <th className="admin_table_th">total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {order.map((item, index) => (
                      <tr className="" key={index}>
                        <td className="admin_table_td">{item.OrderID}</td>
                        <td className="admin_table_td">{item.SupplierID}</td>
                        <td className="admin_table_td">{item.SupplierName}</td>
                        <td className="admin_table_td">{item.QuantityOrder}</td>
                        <td className="admin_table_td">{item.total}</td>
                        <td className="admin_table_td tbl_btn">
                          <Link
                            className="update_btn"
                            to={`/updateOrder/${item._id}`}
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
  );
}

export default AllOrder;
