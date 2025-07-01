'use client';

import { useAdmin } from './AdminContext';

interface DynamicModalContentProps {
  popupId: string;
  onClose: () => void;
  onAction?: () => void;
}

export default function DynamicModalContent({ popupId, onClose, onAction }: DynamicModalContentProps) {
  const { popupContents } = useAdmin();
  const popup = popupContents[popupId];

  if (!popup) return null;

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <>
      <h2 className="text-xl text-gray-800 font-bold mb-2">{popup.title}</h2>
      <p className="text-gray-700 mb-4">
        {formatContent(popup.content)}
      </p>
      
      {/* Different button layouts based on popup type */}
      {popupId === 'promo' ? (
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            닫기
          </button>
          {popup.buttonAction === 'contact' && onAction && (
            <button
              onClick={onAction}
              className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              {popup.buttonText}
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={onClose}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {popup.buttonText}
        </button>
      )}
    </>
  );
} 