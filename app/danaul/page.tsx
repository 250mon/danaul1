'use client';

import Navigation from "@/app/ui/navigation";
import DanaulMobile from "@/app/danaul/components/DanaulMobile";
import DanaulDesktop from "@/app/danaul/components/DanaulDesktop";
import { useState, useEffect, useCallback } from "react";
import { useModals } from "@/app/ui/useModals";
import { PopupModalRenderer } from "@/app/ui/PopupModalManager";
import { useAdmin } from "@/app/ui/AdminContext";
import AdminPanel from "@/app/ui/AdminPanel";
import DynamicModalContent from "@/app/ui/DynamicModalContent";

export default function DanaulPage() {
  const { modals, openModal, closeModal } = useModals();
  const { isAdmin, popupContents } = useAdmin();
  const [hasInitialLoad, setHasInitialLoad] = useState(false);

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

  // Open enabled modals on initial page load only
  useEffect(() => {
    if (!hasInitialLoad) {
      const timer = setTimeout(() => {
        if (popupContents.notice.enabled) {
          openNoticeModal();
        }
        if (popupContents.promo.enabled) {
          openPromoModal();
        }
        setHasInitialLoad(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [hasInitialLoad, popupContents.notice.enabled, popupContents.promo.enabled, openNoticeModal, openPromoModal]);

  // Close modals when they are disabled in admin panel
  useEffect(() => {
    if (hasInitialLoad) {
      if (!popupContents.notice.enabled && modals.notice) {
        closeModal('notice');
      }
      if (!popupContents.promo.enabled && modals.promo) {
        closeModal('promo');
      }
    }
  }, [popupContents.notice.enabled, popupContents.promo.enabled, modals, hasInitialLoad, closeModal]);

  return (
    <div className="relative w-full">
      {/* Navigation */}
      <Navigation />
      
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
