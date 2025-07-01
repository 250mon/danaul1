'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PopupContent {
  id: string;
  title: string;
  content: string;
  enabled: boolean;
  buttonText?: string;
  buttonAction?: string;
}

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  popupContents: Record<string, PopupContent>;
  updatePopupContent: (id: string, content: Partial<PopupContent>) => void;
  resetToDefaults: () => void;
}

const defaultPopupContents: Record<string, PopupContent> = {
  notice: {
    id: 'notice',
    title: '공지사항',
    content: 'x월 xx일(금)~x월 xx일(일) 휴진합니다.\n진료 예약은 전화로 문의해 주세요.',
    enabled: false,
    buttonText: '닫기'
  },
  promo: {
    id: 'promo',
    title: '특별 이벤트',
    content: '...',
    enabled: true,
    buttonText: '예약하기',
    buttonAction: 'contact'
  },
  contact: {
    id: 'contact',
    title: '예약 문의',
    content: '전화: 02-465-9898\n평일: 09:00 - 18:00\n토요일: 09:00 - 13:00',
    enabled: true,
    buttonText: '확인'
  }
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [popupContents, setPopupContents] = useState<Record<string, PopupContent>>(defaultPopupContents);

  // Load from localStorage on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem('isAdmin');
    const adminToken = localStorage.getItem('adminToken');
    const savedContents = localStorage.getItem('popupContents');
    
    // Check if user has valid admin session
    if (savedAdmin === 'true' && adminToken) {
      setIsAdmin(true);
    }
    
    if (savedContents) {
      try {
        const parsed = JSON.parse(savedContents);
        setPopupContents(parsed);
      } catch (error) {
        console.error('Failed to parse saved popup contents:', error);
      }
    }
  }, []);

  // Save to localStorage when admin state changes
  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin.toString());
  }, [isAdmin]);

  // Save to localStorage when popup contents change
  useEffect(() => {
    localStorage.setItem('popupContents', JSON.stringify(popupContents));
  }, [popupContents]);

  const updatePopupContent = (id: string, updates: Partial<PopupContent>) => {
    setPopupContents(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }));
  };

  const resetToDefaults = () => {
    setPopupContents(defaultPopupContents);
    localStorage.removeItem('popupContents');
  };

  return (
    <AdminContext.Provider value={{
      isAdmin,
      setIsAdmin,
      popupContents,
      updatePopupContent,
      resetToDefaults
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