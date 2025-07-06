import Navigation from "@/app/ui/navigation";
import Contact from "./components/Contact";

export default function ContactPage() {
  return (
    <div className="relative w-full">
      {/* Navigation */}
      <Navigation />
      
      {/* Unified Contact Component - responsive for both mobile and desktop */}
      <Contact />
    </div>
  );
}
