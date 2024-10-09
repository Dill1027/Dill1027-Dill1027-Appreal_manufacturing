import { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../Home/SideBar";
function AddSupplier() {
  const [inputs, setInputs] = useState({
    supID: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const generateID = () => {
    const prefix = "SID";
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${randomNumber}`;
  };

  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      supID: generateID(),
    }));
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("Submit successfully!");
    window.location.href = "./SupplierDash";
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8081/supplier", {
      supID: inputs.supID,
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      address: inputs.address,
    });
  };
  return (
    <div>
      <div className="main_function">
        <div>
          <SideBar />
        </div>
        <div className="lef_child">
          <h1 className="main_topic_function">Add Supplier </h1>
          <form className="from_data" onSubmit={handleSubmit}>
            <div className="">
              <label className="form_lable"> ID:</label>
              <br />
              <input
                type="text"
                id="supID"
                name="supID"
                className="form_input"
                value={inputs.supID}
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div className="">
              <label className="form_lable">name:</label>
              <br />
              <input
                type="text"
                id="name"
                name="name"
                className="form_input"
                value={inputs.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="">
              <label className="form_lable">email:</label>
              <br />
              <input
                type="text"
                id="email"
                name="email"
                className="form_input"
                value={inputs.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="">
              <label className="form_lable">phone:</label>
              <br />
              <input
                type="number"
                id="phone"
                name="phone"
                className="form_input"
                value={inputs.QuantityOrder}
                onChange={handleChange}
                required
              />
            </div>
            <div className="">
              <label className="form_lable">address:</label>
              <br />
              <input
                type="txet"
                id="address"
                name="address"
                className="form_input"
                value={inputs.address}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="frombtn">
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSupplier;
