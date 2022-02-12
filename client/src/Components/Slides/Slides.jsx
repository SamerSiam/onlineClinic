import React from "react";
import { Fade } from "react-slideshow-image";
import image1 from "./image1.png";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";
import "./styles.css";

export default function Slides() {
  const fadeImages = [image1, image2, image3];

  let styles = {
    objectFit: "cover",
    width: "70%",
    height: "100%",
    backgroundRepeat: "noRepeat",
    backgroundSize: "cover",
    overflow: "hidden",
    backgroundPosition: " center center",
  };
  return (
    <div className="slide-container">
      <Fade>
        <div className="each-slide">
          <div>
            <img style={styles} src={fadeImages[0]} alt="patient1" />
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img style={styles} src={fadeImages[1]} alt="patient2" />
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img style={styles} src={fadeImages[2]} alt="patient3" />
          </div>
        </div>
      </Fade>
    </div>
  );
}
