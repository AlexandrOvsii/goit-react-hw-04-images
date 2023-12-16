import React from 'react';
import css from './Searchbar.module.css';

function Searchbar({ handleSearchForm }) {
  return (
    <header className={css.Searchbar}>
      <form className="form" onSubmit={handleSearchForm}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          name="searchInput"
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;
