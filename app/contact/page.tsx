import Navigation from "@/app/ui/navigation";
import ContactMobile from "./components/ContactMobile";
import ContactDesktop from "./components/ContactDesktop";

export default function ContactPage() {
  return (
    <div className="relative w-full">
      {/* Navigation */}
      <Navigation />
      
      {/* Mobile Component - shown only on small screens */}
      <ContactMobile />
      
      {/* Desktop Component - shown only on medium+ screens */}
      <ContactDesktop />
    </div>
  );
}
