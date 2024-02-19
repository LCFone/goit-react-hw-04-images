import React, { useEffect } from 'react';

export function Modal({ isOpen, data, tags, onCloseModal }) {
  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape' && isOpen) {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onCloseModal]);

  return (
    isOpen && (
      <div className="Overlay" onClick={handleOverlayClick}>
        <div className="Modal">
          <img src={data} alt={tags} />
        </div>
      </div>
    )
  );
}
