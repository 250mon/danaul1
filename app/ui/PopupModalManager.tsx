'use client';

import { useModals } from "./useModals";

interface PopupModalManagerProps {
  children?: React.ReactNode;
}

export { useModals };

interface PopupModalRendererProps {
  modals: Record<string, React.ReactNode>;
  closeModal: (id: string) => void;
}

export function PopupModalRenderer({ modals, closeModal }: PopupModalRendererProps) {
  if (Object.keys(modals).length === 0) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Container */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center gap-4 p-4 flex-col sm:flex-row">
        {Object.entries(modals).map(([id, content]) => (
          <div key={id} className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full relative">
            <button
              onClick={() => closeModal(id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
            {content}
          </div>
        ))}
      </div>
    </>
  );
}

export default function PopupModalManager({ children }: PopupModalManagerProps) {
  const { modals, closeModal } = useModals();

  return (
    <>
      {children}
      <PopupModalRenderer modals={modals} closeModal={closeModal} />
    </>
  );
} 