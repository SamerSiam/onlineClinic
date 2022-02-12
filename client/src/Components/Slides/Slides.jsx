import React from "react";
import image1 from "./image1.png";
import "./styles.css";

export default function Slides() {
  let styles = {
    objectFit: "cover",
    width: "80%",
    height: "80%",
    backgroundRepeat: "noRepeat",
    backgroundSize: "cover",
    overflow: "hidden",
    backgroundPosition: " center center",
    textAlign: "center",
    paddingLeft: "200px",
    paddingTop: "50px",
  };
  return (
    <div className="main-container">
      <img src={image1} style={styles} alt="image1" />
      <div className="columns">
        <p className="copyright">© 2022 MyOnlineDoctor.com . All rights reserved</p>
      </div>
    </div>
  );
}
