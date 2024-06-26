// Login Page Shape Component

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./ShapeComponent.css"; // Create this CSS file for custom styling
import { Grid } from "@mui/material";

function ShapeComponent() {
  return (
    <div className="Container">
      <div className="circleBox">
        <div className="homeLogoIcon">
          <img
            src="./Assest/HomeIcon.svg"
            alt="HomeIcon"
            className="homeIcon"
          />
          <br />
          <div className="textItems">
            <span className="apartTopic">ApartFlow</span>
            <br />
            <div className="textBottom">
              <span className="apartTextTop">
                "Effortless Apartment Management,{" "}
              </span>
              <br />
              <span className="apartTextBottom">One Click Away"</span>
            </div>
          </div>
        </div>
        <Container>
          <Row>
            <Col>
              <div className="circle"></div>
            </Col>
          </Row>
        </Container>
      </div>
      <Grid>
        <div className="loginPageImage">
          <img
            src="./Assest/LoginImg.png"
            alt="LoginImage"
            className="loginimg"
          />
        </div>
      </Grid>
    </div>
  );
}
export default ShapeComponent;
