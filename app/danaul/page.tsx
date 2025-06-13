import Navigation from "@/app/ui/navigation";
import DanaulMobile from "./components/DanaulMobile";
import DanaulDesktop from "./components/DanaulDesktop";

export default function DanaulPage() {
  return (
    <div className="relative w-full">
      {/* Navigation */}
      <Navigation />
      
      {/* Mobile Component - shown only on small screens */}
      <DanaulMobile />
      
      {/* Desktop Component - shown only on medium+ screens */}
      <DanaulDesktop />
    </div>
  );
}
