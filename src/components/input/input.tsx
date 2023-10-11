import React, { useRef } from "react";
import "./input.scss";
import SearchIcon from "../../assets/search.svg";

export interface InputProps {
  onSearch: (query: string) => void;
}

export const Input: React.FC<InputProps> = ({ onSearch }) => {
  const searchInput = useRef<any>();

  const onEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchInput.current.value);
    }
  };
  
  return (
    <div className="input">
      <input
        ref={searchInput}
        type="text"
        placeholder="kategorilerde ara..."
        onKeyDown={onEnterHandler}
      />
      <button type="button" onClick={() => onSearch(searchInput.current.value)}>
        <img src={SearchIcon} alt="Search" />
      </button>
    </div>
  );
};

export default Input;
