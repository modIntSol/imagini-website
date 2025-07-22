import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Imagini delivered exceptional results on our complex project. Their attention to detail and understanding of our needs was impressive. We couldn't be happier with the final outcome!",
      author: "Usman Khan",
      position: "CEO — Aams",
      rating: 5
    },
    {
      quote: "Hiring Imagini was a no-brainer. We stopped interviewing other agencies halfway through the call.",
      author: "Sarah Johnson",
      position: "CMO",
      company: "fast-growing SaaS startup",
      rating: 5
    },
    {
      quote: "Working with Imagini was an absolute pleasure. They brought innovative solutions to the table and executed the project flawlessly. I'm very satisfied with how everything turned out.",
      author: "Jamal Khan",
      position: "Level Up Vista",
      rating: 5
    },
    {
      quote: "Within two weeks, the difference was obvious. Our site started converting, our social actually worked, and we stopped crying into analytics dashboards.",
      author: "Michael Chen",
      position: "Head of Growth",
      company: "eCommerce brand",
      rating: 5
    },
    {
      quote: "The team at Imagini exceeded our expectations on this challenging project. Their professionalism, expertise, and dedication ensured a smooth experience and an outstanding end result.",
      author: "Aleem Ashraf",
      position: "Chat Pandas",
      rating: 5
    },
    {
      quote: "Imagini took our 'sort-of idea' and turned it into an actual brand people care about. It's wild how fast it clicked.",
      author: "Alex Rodriguez",
      position: "Startup Co-founder",
      company: "pre-launch product",
      rating: 5
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="bg-gradient-primary bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take it from us. Here's what our clients have to say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-border/50 pt-4">
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.position}
                    {testimonial.company && <span className="block">{testimonial.company}</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;