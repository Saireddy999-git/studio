import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-12 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-headline">Our Story</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Founded in 2010, The Savory Spoon was born from a desire to blend traditional recipes with a modern culinary approach. Our philosophy is simple: use the freshest, locally-sourced ingredients to create dishes that are both comforting and exciting.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Our chefs, led by the acclaimed Chef Antoine Dubois, bring a world of experience to our kitchen. Every plate that leaves our kitchen is a testament to our passion for food and our commitment to quality. We invite you to join us for an unforgettable dining experience.
            </p>
          </div>
          <div className="w-full h-full flex justify-center">
             <Image
                src="https://placehold.co/600x800.png"
                alt="Our head chef in the kitchen"
                width={500}
                height={700}
                className="rounded-lg shadow-xl object-cover"
                data-ai-hint="chef portrait"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
