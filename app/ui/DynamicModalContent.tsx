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
    return content.split('\n').map((line, index) => {
      // Check if line contains a display text|URL format
      const linkMatch = line.match(/^(.*?)([^|]+)\|(https?:\/\/[^\s]+)(.*)$/);
      
      if (linkMatch) {
        const [, beforeText, displayText, url, afterText] = linkMatch;
        return (
          <span key={index}>
            {beforeText}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {displayText}
            </a>
            {afterText}
            {index < content.split('\n').length - 1 && <br />}
          </span>
        );
      }
      
      // Handle phone numbers and URLs
      const phoneRegex = /(\d{2,3}-\d{3,4}-\d{4})/g;
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const combinedRegex = /(\d{2,3}-\d{3,4}-\d{4}|https?:\/\/[^\s]+)/g;
      
      const parts = line.split(combinedRegex);
      
      return (
        <span key={index}>
          {parts.map((part, partIndex) => {
            if (phoneRegex.test(part)) {
              return (
                <a
                  key={partIndex}
                  href={`tel:${part}`}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {part}
                </a>
              );
            }
            if (urlRegex.test(part)) {
              return (
                <a
                  key={partIndex}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline break-all"
                >
                  {part}
                </a>
              );
            }
            return part;
          })}
          {index < content.split('\n').length - 1 && <br />}
        </span>
      );
    });
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