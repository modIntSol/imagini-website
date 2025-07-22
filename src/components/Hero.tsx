import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 pb-12 md:pt-16">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/lv_0_20250721155819.webm"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
            Digital Agency That Delivers
          </h1>
          
          <p className="text-xl md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Big ideas. Loud design. Real results. You bring the vision. We'll wire it into reality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a 
              href="https://calendly.com/abe-sshift/15-minute-meeting-for-imagini"
              target="_blank"
              rel="noopener noreferrer"
            >
            <Button variant="default" size="lg" className="hover:scale-105 transition-transform duration-300 px-8 py-6 text-lg">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </a>
            <a href="#portfolio">
              <Button variant="outline" size="lg" className="border-white text-foreground hover:text-black hover:bg-white px-8 py-6 text-lg group">
                <Play className="mr-2 h-5 w-5 transition-colors duration-200 group-hover:text-black" />
                View Our Work
              </Button>
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Client Retention</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">3x</div>
              <div className="text-muted-foreground">ROI Average</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;