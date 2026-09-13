'use client';

import Header from "@/app/ui/Header";
import DanaulMobile from "@/app/danaul/components/DanaulMobile";
import DanaulDesktop from "@/app/danaul/components/DanaulDesktop";
import { useState, useEffect, useCallback, useRef } from "react";
import { useModals } from "@/app/ui/useModals";
import { PopupModalRenderer } from "@/app/ui/PopupModalManager";
import { useAdmin } from "@/app/ui/AdminContext";
import AdminPanel from "@/app/ui/AdminPanel";
import DynamicModalContent from "@/app/ui/DynamicModalContent";

export default function DanaulPage() {
  const { modals, openModal, closeModal } = useModals();
  const { isAdmin, popupContents, isLoading } = useAdmin();
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  const prevEnabled = useRef<Record<string, boolean>>({});

  const openContactModal = useCallback(() => {
    openModal('contact', (
      <DynamicModalContent
        popupId="contact"
        onClose={() => closeModal('contact')}
      />
    ));
  }, [openModal, closeModal]);

  const openNoticeModal = useCallback(() => {
    openModal('notice', (
      <DynamicModalContent
        popupId="notice"
        onClose={() => closeModal('notice')}
      />
    ));
  }, [openModal, closeModal]);

  const openPromoModal = useCallback(() => {
    openModal('promo', (
      <DynamicModalContent
        popupId="promo"
        onClose={() => closeModal('promo')}
        onAction={() => {
          closeModal('promo');
          openContactModal();
        }}
      />
    ));
  }, [openModal, closeModal, openContactModal]);

  // Handle popups: initial load and live admin changes
  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      // 1. Check for Notice popup
      const isNoticeEnabled = !!popupContents.notice?.enabled;
      const wasNoticeEnabled = !!prevEnabled.current.notice;
      
      if (isNoticeEnabled) {
        // Open if it's the first load OR if it was just turned on in admin
        if (!hasInitialLoad || !wasNoticeEnabled) {
          openNoticeModal();
        }
      } else if (wasNoticeEnabled && !isNoticeEnabled) {
        // Close if it was just turned off in admin
        closeModal('notice');
      }

      // 2. Check for Promo popup
      const isPromoEnabled = !!popupContents.promo?.enabled;
      const wasPromoEnabled = !!prevEnabled.current.promo;

      if (isPromoEnabled) {
        if (!hasInitialLoad || !wasPromoEnabled) {
          openPromoModal();
        }
      } else if (wasPromoEnabled && !isPromoEnabled) {
        closeModal('promo');
      }

      // Update refs and state
      prevEnabled.current = {
        notice: isNoticeEnabled,
        promo: isPromoEnabled
      };
      
      if (!hasInitialLoad) {
        setHasInitialLoad(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [
    isLoading, 
    popupContents.notice?.enabled, 
    popupContents.promo?.enabled, 
    openNoticeModal, 
    openPromoModal,
    closeModal,
    hasInitialLoad
  ]);

  return (
    <div className="relative w-full min-h-screen bg-slate-50">
      {/* Navigation */}
      <Header />
      
      {/* Render all active modals side by side */}
      <PopupModalRenderer modals={modals} closeModal={closeModal} />

      {/* Test Buttons (remove in production) */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          <button
            onClick={openNoticeModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
          >
            공지사항
          </button>
          <button
            onClick={openPromoModal}
            className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm"
          >
            특별혜택
          </button>
          <button
            onClick={openContactModal}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm"
          >
            예약문의
          </button>
        </div>
      )}
      
      {/* Admin Panel */}
      <AdminPanel />
      
      {/* Mobile Component - shown only on small screens */}
      <DanaulMobile />
      
      {/* Desktop Component - shown only on medium+ screens */}
      <DanaulDesktop />
    </div>
  );
}
