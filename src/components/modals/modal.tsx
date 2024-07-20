import React, { ReactElement } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Appointment Form</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
       
       {/* This is where the forms will go */}
       {children}
      </div>
    </div>
  );
};

export default Modal;
