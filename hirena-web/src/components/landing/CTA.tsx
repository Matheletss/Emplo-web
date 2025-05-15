import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16 md:py-24 bg-hirena-brown text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl mx-auto">
          Ready to Transform Your Hiring Process?
        </h2>
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Join Hirena today and experience the future of recruitment. Our AI-powered platform helps you find the right talent, faster and smarter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary" className="bg-white text-hirena-brown hover:bg-white/90">
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="bg-white text-hirena-brown hover:bg-white/90">
            <Link to="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
