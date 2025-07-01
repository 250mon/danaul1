'use client';

import { useState } from "react";

export const useModals = () => {
  const [modals, setModals] = useState<Record<string, React.ReactNode>>({});
  
  const openModal = (id: string, content: React.ReactNode) => {
    setModals(prev => ({ ...prev, [id]: content }));
  };
  
  const closeModal = (id: string) => {
    setModals(prev => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };
  
  return { modals, openModal, closeModal };
}; 