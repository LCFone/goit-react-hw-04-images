import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ hits, onOpenModal }) => {
  return (
    <ul className="gallery">
      {hits.map(image => (
        <ImageGalleryItem
          key={image.id}
          id={image.id}
          webformatURL={image.webformatURL}
          tags={image.tags}
          largeImageURL={image.largeImageURL}
          onOpenModal={onOpenModal}
        />
      ))}
    </ul>
  );
};
