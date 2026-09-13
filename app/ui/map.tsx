"use client";

import { useState, useId, useEffect, useCallback } from "react";
import Script from "next/script";
import { CLINIC_INFO } from "@/app/lib/clinic-info";
import { trackEvent } from "@/app/lib/analytics";

declare global {
  interface Window {
    navermap_authFailure?: () => void;
  }
}

// Keys issued in the current NCP console authenticate with `ncpKeyId`; keys from
// the older AI·NAVER API console use `ncpClientId`. Override if yours is legacy.
const AUTH_PARAM = process.env.NEXT_PUBLIC_NAVER_MAP_AUTH_PARAM || "ncpKeyId";

interface MapProps {
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
}

const Map = ({ className = "w-full h-full min-h-[500px]", style, containerClassName = "flex-1 relative" }: MapProps) => {
  const mapId = useId().replace(/:/g, ''); // Generate unique ID and remove colons
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);

  // Ensure component is mounted before trying to initialize map
  useEffect(() => {
    // Check if Naver Maps is already loaded
    if (typeof window !== 'undefined' && window.naver && window.naver.maps) {
      setScriptLoaded(true);
    }
    
    setMounted(true);
  }, []);

  // The Maps API reports a rejected key/domain through this global instead of a
  // script error, so without it an auth failure just renders an empty grey box.
  useEffect(() => {
    window.navermap_authFailure = () => {
      setAuthFailed(true);
      setMapLoaded(false);
      setMapError("Naver Maps 인증에 실패했습니다");
    };

    return () => {
      delete window.navermap_authFailure;
    };
  }, []);

  const initializeMap = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && window.naver && window.naver.maps) {
                const mapDiv = document.getElementById(mapId);
        if (mapDiv) {
          // initialize map
          const map = new window.naver.maps.Map(mapId, {
            center: new window.naver.maps.LatLng(CLINIC_INFO.coordinates.lat, CLINIC_INFO.coordinates.lng),
            zoom: 14,
        });
          // add marker
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(CLINIC_INFO.coordinates.lat, CLINIC_INFO.coordinates.lng),
            map: map,
            title: CLINIC_INFO.name,
          });
          // add marker description
          const markerDescription = new window.naver.maps.InfoWindow({
            // add css style
            content: `<div style="width: 100px; height: 20px; background-color: white; border-radius: 1px; padding: 2px; font-size: 12px; font-weight: bold; color: black; text-align: center; line-height: 20px;">${CLINIC_INFO.name}</div>`,
          });
          markerDescription.open(map, marker);

          // add marker click event
          window.naver.maps.Event.addListener(marker, 'click', () => {
            trackEvent("map_click", { provider: "naver_marker" });
            window.open(CLINIC_INFO.maps.naver, '_blank', 'noopener,noreferrer');
          });
          
          setMapLoaded(true);
        } else {
          setMapError("지도 영역을 찾지 못했습니다.");
        }
      } else {
        setMapError("네이버 지도 API가 로드되지 않았습니다.");
      }
    } catch (error) {
      setMapError(error instanceof Error ? error.message : "Unknown error occurred");
    }
  }, [mapId, setMapLoaded, setMapError]);

  // Try to initialize map when both script and component are ready
  useEffect(() => {
    if (mounted && scriptLoaded && !mapLoaded && !mapError && !authFailed) {
      // Add a small delay to ensure DOM is fully ready
      const timer = setTimeout(() => {
        initializeMap();
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [mounted, scriptLoaded, mapLoaded, mapError, authFailed, initializeMap]);

  // Fallback: if script doesn't load within reasonable time, show error
  useEffect(() => {
    if (mounted && !scriptLoaded && !mapError) {
      const fallbackTimer = setTimeout(() => {
        if (!scriptLoaded && !mapLoaded) {
          setMapError("지도 로딩이 지연되고 있습니다. 잠시 후 다시 시도해 주세요.");
        }
      }, 12000);
      
      return () => clearTimeout(fallbackTimer);
    }
  }, [mounted, scriptLoaded, mapLoaded, mapError]);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  const handleScriptError = () => {
    setMapError("네이버 지도 스크립트를 불러오지 못했습니다.");
  };

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <div className={containerClassName}>
        <div className={className} style={style}>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="text-white text-sm">지도를 불러오는 중…</div>
          </div>
        </div>
      </div>
    );
  }

  // Check for missing API key
  if (!process.env.NEXT_PUBLIC_NAVER_CLIENT_ID) {
    return (
      <div className={containerClassName}>
        <div className={className} style={style}>
          <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 backdrop-blur-sm">
            <div className="text-white text-center">
              <div className="text-lg font-semibold">지도 설정 오류</div>
              <div className="text-sm mt-2">NEXT_PUBLIC_NAVER_CLIENT_ID가 설정되지 않았습니다</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?${AUTH_PARAM}=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        onLoad={handleScriptLoad}
        onError={handleScriptError}
        strategy="afterInteractive"
      />
      
      <div className={containerClassName}>
        <div id={mapId} className={className} style={style}></div>
        
        {!mapLoaded && !mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="text-white text-sm">지도를 불러오는 중…</div>
          </div>
        )}
        
        {mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80 backdrop-blur-sm p-6">
            <div className="text-white text-center max-w-xs">
              <div className="text-base font-semibold">
                {authFailed ? "지도를 불러올 수 없습니다" : "지도 로딩 오류"}
              </div>
              <p className="text-sm mt-2 opacity-90 leading-relaxed">
                {authFailed
                  ? "네이버 지도 인증이 거부되었습니다. 아래 버튼으로 네이버 지도에서 위치를 확인하실 수 있습니다."
                  : mapError}
              </p>
              {authFailed && (
                <p className="text-[11px] mt-3 opacity-60 leading-relaxed">
                  관리자: NCP 콘솔의 Web Dynamic Map 서비스 URL에 현재 도메인이 등록되어
                  있는지, 키 종류에 맞는 인증 파라미터를 쓰는지 확인해 주세요.
                </p>
              )}
              <div className="flex gap-2 justify-center mt-4">
                <a
                  href={CLINIC_INFO.maps.naver}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("map_click", { provider: "naver_fallback" })}
                  className="px-4 py-2 bg-[#03C75A] rounded text-sm font-bold hover:bg-[#02b351] transition-colors"
                >
                  네이버 지도 열기
                </a>
                {!authFailed && (
                  <button
                    type="button"
                    onClick={() => {
                      setMapError(null);
                      setMapLoaded(false);
                      setScriptLoaded(false);

                      if (typeof window !== 'undefined' && window.naver && window.naver.maps) {
                        setScriptLoaded(true);
                      }

                      setTimeout(() => {
                        if (scriptLoaded || (window.naver && window.naver.maps)) {
                          initializeMap();
                        }
                      }, 500);
                    }}
                    className="px-4 py-2 bg-white/20 rounded text-sm hover:bg-white/30 transition-colors"
                  >
                    다시 시도
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Map;