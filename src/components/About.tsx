import { Badge } from "@/components/ui/badge";

const About = () => {
  const stats = [
    { value: "300%", label: "lead gen spike within 3 months", subtitle: "Actual math, not fluff" },
    { value: "100%", label: "custom-built interfaces", subtitle: "From brain to pixel. No cookie-cutter solutions." },
    { value: "5x", label: "more website engagement", subtitle: "Turns out, when it looks good and works, people click." },
    { value: "95%", label: "of clients stick around", subtitle: "If you actually bring results they come back." },
  ];

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
              About Imagini
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              The Creatives Behind Your Digital Magic{" "}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We're not just a digital agency; we're the people who get excited about your big ideas and bring them to life.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We've grown into one of the best digital agencies and leading tech agencies in the region (and honestly, beyond). Our work has been featured, awarded, and occasionally copied but never ignored.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Why? Because we turn bold ideas into beautiful things that actually work. From sleek websites and sharp branding to SEO that gets attention and campaigns that convert, we bring results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 hover:shadow-card transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-foreground font-medium mb-2 text-sm">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;