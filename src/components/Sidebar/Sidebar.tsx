import React, { ReactNode } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import "../Sidebar/Sidebar.css";

interface SidebarI {
  children: ReactNode;
  sidebarHeading: string;
  openDrawer: () => void;
  handleCloseSidebar: () => void;
  handleApply: () => void;
}

const Sidebar = ({
  children,
  sidebarHeading,
  openDrawer,
  handleCloseSidebar,
  handleApply,
}: SidebarI) => {
  return (
    <Offcanvas
      show={openDrawer}
      onHide={handleCloseSidebar}
      variant="dark"
      placement="end"
    >
      <Offcanvas.Header closeButton className="canvas-header">
        <Offcanvas.Title className="fw-bold fs-4 text-center">
          {sidebarHeading}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
      <hr />
      <div className="offcanvas-footer">
        <Button
          className="cancel-button"
          variant="light"
          onClick={handleCloseSidebar}
        >
          Close
        </Button>
        <Button className="apply-button" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </Offcanvas>
  );
};

export default Sidebar;
