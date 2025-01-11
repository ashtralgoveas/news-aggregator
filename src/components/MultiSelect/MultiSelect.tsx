import React from 'react';
import { Form } from 'react-bootstrap';
import '../MultiSelect/MultiSelect.css';
import CustomizedBadge from '../CustomizedBadge/CustomizedBadge';

interface MultiSelectI {
  dropdownLabel: string;
  dropdownPlaceholder: string;
  options: string[];
  selectedValues: string[];
  onChange: () => void;
}

const MultiSelect = ({
  dropdownLabel,
  dropdownPlaceholder,
  options,
  selectedValues,
  onChange,
}: MultiSelectI) => {
  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption && !selectedValues.includes(selectedOption)) {
      onChange([...selectedValues, selectedOption]);
    }
  };

  const handleRemove = (valueToRemove) => {
    const updatedValues = selectedValues.filter((val) => val !== valueToRemove);
    onChange(updatedValues);
  };

  const availableOptions = options.filter(
    (opt) => !selectedValues.includes(opt)
  );

  return (
    <Form.Group controlId="multiSelectDropdown">
      <Form.Label style={{ fontWeight: 'bold', fontSize: '14px' }}>
        {dropdownLabel}
      </Form.Label>
      <Form.Select
        aria-label={dropdownLabel}
        onChange={handleSelectChange}
        value=""
        className="custom-dropdown"
      >
        <option value="">{dropdownPlaceholder}</option>
        {availableOptions.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>

      <div style={{ marginTop: '10px' }}>
        {selectedValues.map((value, i) => (
          <CustomizedBadge
            badgeName={value}
            badgeIndex={i}
            handleRemove={handleRemove}
          />
        ))}
      </div>
    </Form.Group>
  );
};

export default MultiSelect;
