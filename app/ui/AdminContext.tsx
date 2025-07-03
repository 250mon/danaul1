'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PopupContent, defaultPopupContents } from '@/app/lib/constants';

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  popupContents: Record<string, PopupContent>;
  updatePopupContent: (id: string, content: Partial<PopupContent>) => void;
  resetToDefaults: () => void;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [popupContents, setPopupContents] = useState<Record<string, PopupContent>>(defaultPopupContents);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch popup contents from server
  const fetchPopupContents = async () => {
    try {
      const response = await fetch('/api/admin/popups');
      const data = await response.json();
      if (data.success) {
        setPopupContents(data.contents);
      }
    } catch (error) {
      console.error('Failed to fetch popup contents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load admin state and fetch popup contents on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem('isAdmin');
    const adminToken = localStorage.getItem('adminToken');
    
    // Check if user has valid admin session
    if (savedAdmin === 'true' && adminToken) {
      setIsAdmin(true);
    }
    
    // Always fetch popup contents from server
    fetchPopupContents();
  }, []);

  // Save to localStorage when admin state changes
  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin.toString());
  }, [isAdmin]);

  const updatePopupContent = async (id: string, updates: Partial<PopupContent>) => {
    // Update local state immediately for responsive UI
    const newContents = {
      ...popupContents,
      [id]: { ...popupContents[id], ...updates }
    };
    setPopupContents(newContents);

    // Save to server if admin is logged in
    if (isAdmin) {
      try {
        const adminToken = localStorage.getItem('adminToken');
        
        if (!adminToken) {
          console.error('No admin token found');
          alert('인증 토큰이 없습니다. 다시 로그인해주세요.');
          return;
        }
        
        const response = await fetch('/api/admin/popups', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
          },
          body: JSON.stringify({ contents: newContents }),
        });

        const responseData = await response.json();
        
        if (!response.ok) {
          console.error('Server response error:', response.status, responseData);
          alert(`서버 저장 실패: ${responseData.error || '알 수 없는 오류'}`);
          return;
        }

        if (!responseData.success) {
          console.error('Save operation failed:', responseData.error);
          alert(`저장 실패: ${responseData.error}`);
          return;
        }
      } catch (error) {
        console.error('Error saving popup contents:', error);
        alert(`저장 중 오류 발생: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
      }
    }
  };

  const resetToDefaults = async () => {
    if (isAdmin) {
      try {
        const adminToken = localStorage.getItem('adminToken');
        const response = await fetch('/api/admin/popups', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        });

        const data = await response.json();
        if (data.success) {
          setPopupContents(data.contents);
        }
      } catch (error) {
        console.error('Error resetting popup contents:', error);
      }
    }
  };

  return (
    <AdminContext.Provider value={{
      isAdmin,
      setIsAdmin,
      popupContents,
      updatePopupContent,
      resetToDefaults,
      isLoading
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
} 