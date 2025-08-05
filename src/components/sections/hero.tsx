import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white">
      <Image
        src="https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D"
        alt="A beautifully set table at Mudu Kalalu"
        fill={true}
        style={{objectFit: 'cover'}}
        className="brightness-50"
        data-ai-hint="restaurant interior"
      />
      <div className="relative z-10 p-4">
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight">
          Mudu Kalalu
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/90">
          Where culinary artistry meets timeless tradition. Experience a symphony of flavors crafted with the finest ingredients.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/menu">View Our Menu</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="/#contact">Make a Reservation</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
