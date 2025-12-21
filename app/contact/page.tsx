import Header from "@/app/ui/Header";
import Contact from "./components/Contact";

export default function ContactPage() {
  return (
    <div className="relative w-full">
      {/* Navigation */}
      <Header />
      
      {/* Unified Contact Component - responsive for both mobile and desktop */}
      <Contact />
    </div>
  );
}
