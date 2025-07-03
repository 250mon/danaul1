"use client";

import { useState, useId, useEffect, useCallback } from "react";
import Script from "next/script";
import { CLINIC_INFO } from "@/app/lib/clinic-info";

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

  // Ensure component is mounted before trying to initialize map
  useEffect(() => {
    // Check if Naver Maps is already loaded
    if (typeof window !== 'undefined' && window.naver && window.naver.maps) {
      setScriptLoaded(true);
    }
    
    setMounted(true);
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
          window.naver.maps.Event.addListener(marker, 'click', (e) => {  
            const overlay = e.overlay, // marker
            position = overlay.getPosition(),
            url = 'http://map.naver.com/index.nhn?enc=utf8&level=2&lng='+ position.lng() +'&lat='+ position.lat() +'&pinTitle='+ CLINIC_INFO.name +'&pinType=SITE';
    
            window.open(url);
          });
          
          setMapLoaded(true);
        } else {
          setMapError("Map container not found");
        }
      } else {
        setMapError("Naver Maps API not loaded");
      }
    } catch (error) {
      setMapError(error instanceof Error ? error.message : "Unknown error occurred");
    }
  }, [mapId, setMapLoaded, setMapError]);

  // Try to initialize map when both script and component are ready
  useEffect(() => {
    if (mounted && scriptLoaded && !mapLoaded && !mapError) {
      // Add a small delay to ensure DOM is fully ready
      const timer = setTimeout(() => {
        initializeMap();
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [mounted, scriptLoaded, mapLoaded, mapError, initializeMap]);

  // Fallback: if script doesn't load within reasonable time, show error
  useEffect(() => {
    if (mounted && !scriptLoaded && !mapError) {
      const fallbackTimer = setTimeout(() => {
        if (!scriptLoaded && !mapLoaded) {
          setMapError("Map loading timeout - please refresh the page");
        }
      }, 5000); // Reduced to 5 seconds for faster feedback
      
      return () => clearTimeout(fallbackTimer);
    }
  }, [mounted, scriptLoaded, mapLoaded, mapError]);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  const handleScriptError = () => {
    setMapError("Failed to load Naver Maps API");
  };

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <div className={containerClassName}>
        <div className={className} style={style}>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="text-white text-lg">Loading map...</div>
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
              <div className="text-lg font-semibold">Configuration Error</div>
              <div className="text-sm mt-2">Naver Maps API key is missing</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
        onLoad={handleScriptLoad}
        onError={handleScriptError}
        strategy="lazyOnload"
      />
      
      <div className={containerClassName}>
        <div id={mapId} className={className} style={style}></div>
        
        {!mapLoaded && !mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="text-white text-lg">Loading map...</div>
          </div>
        )}
        
        {mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 backdrop-blur-sm">
            <div className="text-white text-center">
              <div className="text-lg font-semibold">Map Load Error</div>
              <div className="text-sm mt-2">{mapError}</div>
              {mapError.includes("timeout") && (
                <div className="text-xs mt-2 opacity-75">
                  This might be due to network issues or missing API configuration
                </div>
              )}
              <button 
                onClick={() => {
                  setMapError(null);
                  setMapLoaded(false);
                  setScriptLoaded(false);
                  
                  // Check if API is already available
                  if (typeof window !== 'undefined' && window.naver && window.naver.maps) {
                    setScriptLoaded(true);
                  }
                  
                  // Re-trigger initialization after a delay
                  setTimeout(() => {
                    if (scriptLoaded || (window.naver && window.naver.maps)) {
                      initializeMap();
                    }
                  }, 500);
                }}
                className="mt-4 px-4 py-2 bg-white/20 rounded hover:bg-white/30 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Map;