import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./style/ContactSearch.css";

function ContactSearch() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="contact_search">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search name" />
        <button>
          <AiOutlineSearch />
        </button>
      </form>
    </div>
  );
}

export default ContactSearch;
