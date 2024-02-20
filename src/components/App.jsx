import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';  
import { Modal } from './Modal/Modal';
import { LoadMore } from './Button/Button';

import { requestHits } from 'services/api';

export function App() {

  const [modal, setModal] = useState({ isOpen: false, modalData: null });
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    const fetchHits = async () => {
      try {        
        const response = await requestHits(query, page);
        
        if (response.hits.length === 0) {
          toast.error('No results found for this search. Please try again.');
          return; 
        }

        if (page === 1) {
          setHits(response.hits);
          setShowLoadMore(true);
        } else {
          setHits(prevHits => [...prevHits, ...response.hits]);
          setShowLoadMore(true);
        }

      } catch (error) {
        toast.error(error.message);
      } finally {
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
      modalData: modalData
    });
  };

  const onCloseModal = () => {
    setModal({
      isOpen: false,
      modalData: null
    });
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      
      <ToastContainer autoClose={4000} />

      <ImageGallery hits={hits} onOpenModal={onOpenModal} />


      {hits.length > 0 && (
        <LoadMore
          handleLoadMore={handleLoadMore}
          showLoadMore={showLoadMore}  
        />
      )}

      <Modal
        onCloseModal={onCloseModal}
        data={modal.modalData}
        isOpen={modal.isOpen}
      />
    </>
  );

}