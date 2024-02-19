import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { requestHits } from 'services/api';
import { Loader } from './Loader/Loader';
import { LoadMore } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export function App() {
  const [modal, setModal] = useState({ isOpen: false, modalData: null });
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (page === 1 && query === '') {
      return;
    }
    const fetchHits = async () => {
      try {
        setIsLoading(true);
        const response = await requestHits(query, page);

        if (page === 1) {
          setHits(response.hits);
          setShowLoadMore(true);
        } else {
          setHits(prevHits => [...prevHits, ...response.hits]);
          setShowLoadMore(true);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHits();
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onOpenModal = modalData => {
    setModal({
      isOpen: true,
      modalData: modalData,
    });
  };

  const onCloseModal = () => {
    setModal({
      isOpen: false,
      modalData: null,
    });
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <ToastContainer autoClose={4000} />
      <ImageGallery hits={hits} onOpenModal={onOpenModal} />
      <Loader loading={isLoading} error={error} />
      <LoadMore handleLoadMore={handleLoadMore} showLoadMore={showLoadMore} />
      <Modal
        onCloseModal={onCloseModal}
        data={modal.modalData}
        isOpen={modal.isOpen}
      />
    </>
  );
}
