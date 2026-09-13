"use client";

import { useEffect } from "react";
import { CLINIC_INFO } from "@/app/lib/clinic-info";
import { trackEvent } from "@/app/lib/analytics";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
          일시적인 오류가 발생했습니다
        </h1>
        <p className="text-slate-600 leading-relaxed mb-8">
          잠시 후 다시 시도해 주세요. 문제가 계속되면{" "}
          <a
            href={`tel:${CLINIC_INFO.phone}`}
            onClick={() => trackEvent("tel_click", { location: "error_page" })}
            className="text-primary font-bold hover:underline"
          >
            {CLINIC_INFO.phone}
          </a>
          으로 문의해 주시기 바랍니다.
        </p>
        <button
          type="button"
          onClick={reset}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-blue-800 transition-colors"
        >
          다시 시도
        </button>
      </div>
    </main>
  );
}
