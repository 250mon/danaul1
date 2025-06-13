import Navigation from "./navigation";

interface BackgroundLayoutProps {
  children: React.ReactNode;
  backgroundImage?: string;
  darkOverlayOpacity?: number;
  showHexagonOverlay?: boolean;
}

export default function BackgroundLayout({
  children,
  backgroundImage = "/danaul/hero_bg.jpg",
  darkOverlayOpacity = 0.6,
  showHexagonOverlay = true,
}: BackgroundLayoutProps) {
  return (
    <div className="relative w-full min-h-screen">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 w-full h-full bg-center bg-no-repeat 
                   bg-contain portrait:bg-contain landscape:bg-cover 
                   sm:bg-cover md:bg-fixed"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      {/* Hexagon overlay - conditionally rendered */}
      {showHexagonOverlay && (
        <div
          className="fixed inset-0 w-full h-full pointer-events-none bg-center 
                     bg-contain portrait:bg-contain landscape:bg-cover 
                     sm:bg-cover md:bg-fixed"
          style={{
            backgroundImage: "url('/danaul/hexagon.png')",
          }}
        />
      )}

      {/* Dark overlay for better text readability */}
      <div 
        className="fixed inset-0 bg-black"
        style={{ opacity: darkOverlayOpacity }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 