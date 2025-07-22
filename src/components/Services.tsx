import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Code, Smartphone, TrendingUp } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: "Branding & Design",
      description: "Creating memorable brand identities that resonate with your audience",
      items: ["Logo Design", "Print Design", "Motion Graphics", "UI/UX Design"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and web applications built for performance and scale",
      items: ["Webflow", "Framer", "WordPress", "Shopify", "MERN Stack"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android",
      items: ["iOS Apps", "Android Apps", "React Native", "Mobile ASO"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description: "Data-driven marketing strategies that drive growth and conversions",
      items: ["SEO", "SEM", "Social Media Marketing", "PPC", "On-Page Optimization"],
      color: "from-orange-500 to-red-500"
    }
  ];

  // Duplicate the services array multiple times for seamless looping
  const allServices = [...services, ...services, ...services];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From concept to launch, we provide end-to-end digital solutions that help your business thrive in the digital landscape.
          </p>
        </div>

        {/* Animated waterflow container */}
        <div className="overflow-x-hidden relative w-full" style={{ minHeight: 400 }}>
          <div
            className="flex animate-waterflow gap-8 absolute left-0 top-0"
            style={{ minWidth: '200%', height: '100%' }}
          >
            {allServices.map((service, index) => (
              <Card 
                key={index} 
                className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-elegant transition-all duration-300 hover:scale-104 group min-w-[270px] max-w-xs h-[340px] md:h-[360px] lg:h-[380px]"
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center mx-auto mb-4 group-hover:animate-glow`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.items.map((item, itemIndex) => (
                      <Badge 
                        key={itemIndex} 
                        variant="secondary" 
                        className="text-xs bg-secondary/50 hover:bg-secondary/80 transition-colors"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;