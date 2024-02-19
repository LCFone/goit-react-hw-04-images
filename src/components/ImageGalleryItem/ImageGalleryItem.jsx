export const ImageGalleryItem = ({
    webformatURL,
    largeImageURL,
    tags,
    onOpenModal,
    id,
  }) => {
    return (
      <li key={id} className="ImageGalleryItem">
        <img
          src={webformatURL}
          alt={tags}
          className="ImageGalleryItem-image"
          onClick={() => onOpenModal(largeImageURL)}
        />
      </li>
    );
  };
  