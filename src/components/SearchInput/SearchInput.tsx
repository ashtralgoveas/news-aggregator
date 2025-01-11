import React from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

interface SearchInputI {
  inputValue: string;
  setInputValue: () => void;
  isDisabled: boolean;
  handleSubmit: () => void;
}

const SearchInput = ({
  inputValue,
  setInputValue,
  isDisabled,
  handleSubmit,
}: SearchInputI) => {
  return (
    <span className="search-box">
      <InputGroup>
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-3"
        />
        <Button
          id="button-addon2"
          className="search-button"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          <FaSearch />
        </Button>
      </InputGroup>
    </span>
  );
};

export default SearchInput;
