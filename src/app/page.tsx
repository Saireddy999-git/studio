import Hero from "@/components/sections/hero";
import FeaturedDishes from "@/components/sections/featured-dishes";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedDishes />
      <Separator className="my-12 md:my-24" />
      <About />
      <Separator className="my-12 md:my-24" />
      <Contact />
    </>
  );
}
