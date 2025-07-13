import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(null); 

  const open = (name) => setOpenModal(name);
  const close = () => setOpenModal(null);
  const isOpen = (name) => openModal === name;

  return (
    <ModalContext.Provider value={{ openModal, open, close, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
