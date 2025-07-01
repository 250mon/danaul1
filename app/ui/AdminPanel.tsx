'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD; // Change this to a secure password

export default function AdminPanel() {
  const { isAdmin, setIsAdmin, popupContents, updatePopupContent, resetToDefaults } = useAdmin();
  const [password, setPassword] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Secret keyboard shortcut: Ctrl+Shift+A (or Cmd+Shift+A on Mac)
    const handleKeyPress = (event: KeyboardEvent) => {
      // Try multiple variations of the 'A' key
      const isAKey = event.key === 'A' || event.key === 'a' || event.code === 'KeyA';
      const isModifierPressed = (event.ctrlKey || event.metaKey) && event.shiftKey;
      
      if (isModifierPressed && isAKey) {
        event.preventDefault();
        if (!isAdmin) {
          setShowPanel(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    // Backup method: Triple-click on logo to access admin
    const handleLogoClick = () => {
      setClickCount(prev => prev + 1);
      setTimeout(() => setClickCount(0), 1000); // Reset after 1 second
    };

    // Check for triple click
    if (clickCount >= 3 && !isAdmin) {
      setShowPanel(true);
      setClickCount(0);
    }

    // Add click listener to logo (if it exists)
    const logoElement = document.querySelector('a[href="/danaul"]');
    if (logoElement) {
      logoElement.addEventListener('click', handleLogoClick);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (logoElement) {
        logoElement.removeEventListener('click', handleLogoClick);
      }
    };
  }, [isAdmin, clickCount]);



  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setPassword('');
      setShowPanel(true);
    } else {
      alert('잘못된 비밀번호입니다.');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowPanel(false);
  };

  const handleSave = (id: string, field: string, value: string | boolean) => {
    updatePopupContent(id, { [field]: value });
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  if (!isAdmin) {
    return (
      <>
        {/* Hidden admin access - only show login panel when triggered by keyboard shortcut */}
        {showPanel && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[200]">
            <div className="bg-white rounded-lg shadow-2xl p-6 min-w-[320px] border-2 border-gray-300">
              <h3 className="text-xl font-bold mb-4 text-gray-900">관리자 로그인</h3>
              <div className="text-sm text-gray-700 mb-4">
                <p className="mb-2 font-medium">접근 방법:</p>
                <p className="mb-1">• 키보드: <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono text-gray-800">Ctrl+Shift+A</kbd></p>
                <p>• 로고를 빠르게 3번 클릭</p>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md text-sm mb-4 text-gray-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={handleLogin}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  로그인
                </button>
                <button
                  onClick={() => setShowPanel(false)}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md text-sm font-medium hover:bg-gray-600 transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="px-3 py-1 bg-green-500 text-white rounded text-xs"
      >
        {showPanel ? '관리자 패널 닫기' : '관리자 패널'}
      </button>
      
      {showPanel && (
        <div className="absolute bottom-8 left-0 bg-white rounded-lg shadow-2xl p-4 min-w-[400px] max-h-[600px] overflow-y-auto border-2 border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">팝업 관리</h3>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
            >
              로그아웃
            </button>
          </div>
          
          <div className="space-y-4">
            {Object.values(popupContents).map((popup) => (
              <div key={popup.id} className="border-2 border-gray-200 rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-900 text-base">{popup.id}</h4>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={popup.enabled}
                      onChange={(e) => handleSave(popup.id, 'enabled', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700">활성화</span>
                  </label>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                    <input
                      type="text"
                      value={popup.title}
                      onChange={(e) => handleSave(popup.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
                    <textarea
                      value={popup.content}
                      onChange={(e) => handleSave(popup.id, 'content', e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-md text-sm text-gray-900 bg-white h-24 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                      placeholder="줄바꿈은 \n 으로 입력하세요"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">버튼 텍스트</label>
                    <input
                      type="text"
                      value={popup.buttonText || ''}
                      onChange={(e) => handleSave(popup.id, 'buttonText', e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  
                  {popup.id === 'promo' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">버튼 액션</label>
                      <select
                        value={popup.buttonAction || ''}
                        onChange={(e) => handleSave(popup.id, 'buttonAction', e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      >
                        <option value="">없음</option>
                        <option value="contact">연락처 팝업 열기</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t-2 border-gray-200">
            <button
              onClick={resetToDefaults}
              className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
            >
              기본값으로 복원
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 