import React, { useState } from 'react';
import { GrSearch, GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ setSearching }) => {
  // State to manage the keyword input
  const [keyword, setKeyword] = useState('');
  // Hook to navigate to search results
  const navigate = useNavigate();

  // Handler for the search form submission
  const searchHandler = (e) => {
    e.preventDefault();
    // Trim the keyword and check if it's empty
    let trimmedKeyword = keyword.trim();
    // Navigate to search results page with the trimmed keyword
    if (trimmedKeyword) {
      navigate(`/products/${trimmedKeyword}`);
    } else {
      // If the keyword is empty, navigate to the general products page
      navigate('/products');
    }
  };

  // Handler to close the search bar
  const closeSearchHandler = () => {
    // Reset the keyword and update the state to indicate that searching is false
    setKeyword('');
    setSearching(false);
  };

  // Component structure: Search form and close button
  return (
    <div className="flex items-center justify-center">
      {/* Search form */}
      <form onSubmit={searchHandler}>
        {/* Input for the search keyword */}
        <input
          className='focus:border-none outline-none bg-transparent w-10/12 placeholder:text-gray-800'
          value={keyword}
          placeholder='Search'
          onChange={(e) => setKeyword(e.target.value)}
        />
        {/* Submit button with search icon */}
        <button type='submit' className="ml-2 cursor-pointer"><GrSearch /></button>
      </form>

      {/* Close button for mobile view */}
      <button onClick={closeSearchHandler} className="cursor-pointer lg:hidden">
        <GrClose />
      </button>
    </div>
  );
};

export default SearchBar;