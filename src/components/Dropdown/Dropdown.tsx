import React from "react";
import { Form } from "react-bootstrap";
import { capitaLize } from "../../config/config";

interface DropdownI {
  dropdownLabel: string;
  dropdownPlaceholder: string;
  options: string[];
  handleChange: () => void;
  selectedValue: string;
  isObject?: boolean;
}

const Dropdown = ({
  dropdownLabel,
  dropdownPlaceholder,
  options,
  handleChange,
  selectedValue,
  isObject = false,
}: DropdownI) => {
  return (
    <Form.Group controlId="dropdown">
      <Form.Label style={{ fontWeight: "bold", fontSize: "14px" }}>
        {dropdownLabel}
      </Form.Label>
      <Form.Select
        aria-label={dropdownLabel}
        onChange={handleChange}
        value={isObject ? selectedValue?.key || "" : selectedValue}
      >
        <option value="">{dropdownPlaceholder}</option>
        {options.map((item, i) => (
          <option key={i} value={isObject ? item.key : item}>
            {isObject ? capitaLize(item.name) : capitaLize(item)}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default Dropdown;
