import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = navItems.map(item => item.href.replace('#', ''));
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg backdrop-saturate-200 px-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home">
              <h1 className="text-2xl font-bold text-foreground">
                Imagini
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium border-b-2 ${activeSection === item.href.replace('#', '') ? 'border-primary' : 'border-transparent'}`}
                >
                  {item.label}
                </a>
              ))}
              <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium border-b-2 border-transparent hover:border-primary">
                Blog
              </Link>
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <a 
                href="https://calendly.com/abe-sshift/15-minute-meeting-for-imagini"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Schedule a Call
                </Button>
              </a>
              
              {user ? (
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <a href="#contact">
                  <Button variant="default" className="hover:scale-105 transition-transform duration-300">
                    Get Started
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-md rounded-lg mt-2 border border-border/50">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-muted-foreground hover:text-foreground block px-3 py-2 text-base font-medium transition-colors duration-200 border-b-2 ${activeSection === item.href.replace('#', '') ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
               ))}
                
                <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 border-b-2 border-transparent hover:border-primary">
                  Blog
                </Link>

                <div className="px-3 py-2 space-y-2">
                  <a 
                    href="https://calendly.com/abe-sshift/15-minute-meeting-for-imagini"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full border-primary text-primary">
                      Schedule a Call
                    </Button>
                  </a>
                  
                  {user ? (
                    <Button 
                      onClick={handleSignOut}
                      variant="default" 
                      className="w-full"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  ) : (
                    <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="default" className="w-full">
                        Get Started
                      </Button>
                    </a>
                  )}
                </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;