import React from 'react';

export function LoadMore({ showLoadMore, handleLoadMore }) {
  return (
    <div>
      {showLoadMore && (
        <button onClick={handleLoadMore} className="Button">
          Load More
        </button>
      )}
    </div>
  );
}
