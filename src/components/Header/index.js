import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { Avatar } from "@material-ui/core";
import "./style.css";

function Header(props) {
  return (
    <div>
      <Navbar expand="lg" className="navbar navbar-default fixed-top">
        <Navbar.Brand href="#home">
          <ChevronLeftIcon className="navbar__icon" />
          <ChevronRightIcon className="navbar__icon" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {/* <Dropdown> */}
              <p
                id="dropdown-basic"
                className="profile__dropdown header__right"
                style={{
                 padding:2,
                }}
              >
                <Avatar src={props.image} />
                <span
                  style={{
                    marginRight: 10,
                    marginLeft: 10,
                    fontSize: 16,
                    color:"#fff"
                  }}
                >
                  {props.name}
                </span>
              </p>
            {/* </Dropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
