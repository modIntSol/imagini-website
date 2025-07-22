import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Index = () => {
  const { profile } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div id="home">
        <Hero />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="portfolio">
        <Testimonials />
      </div>
      <div id="contact">
        <Contact />
      </div>
      
      {/* Admin Access Footer */}
      <footer className="bg-black border-t border-zinc-800 py-8">
        <div className="container mx-auto px-4 text-center">
          {/* Admin dashboard and login removed */}
        </div>
      </footer>
    </div>
  );
};

export default Index;
