import React from "react";
import SideBar from "./SideBar";
import "../../App.css";
import BackIm from "./img/bk.jpg";
function Home() {
  return (
    <div>
      <div className="main_function">
        <div>
          <SideBar />
        </div>
        <div className="lef_child">
          <div className="img_home">
            <img src={BackIm} alt="img" className="img_min" />
            <p className="mai_topic"> Welcome to the Apparel manufacturing management system!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
