import { useState } from 'react';
import { toast } from 'react-toastify';

export function Searchbar({ onSubmit }) {
  const [tags, setTags] = useState('');

  const onInputChange = event => {
    const inputValue = event.target.value.toLowerCase();
    setTags(inputValue);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!tags.trim() === '') {
      toast.error('Введіть щось у поле');
      return;
    }
    onSubmit(tags);
    setTags('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button ">
          <span className="button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={tags}
          onChange={onInputChange}
        />
      </form>
    </header>
  );
}
