import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-12 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-headline">From a Dream to Your Table</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The Savory Spoon began with a simple dream. Our founder, Sai, a young man from a middle-class background, envisioned a place where exquisite food could be enjoyed by everyone. At just 21 years old, with unwavering support from his family, he turned that dream into a reality.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Our philosophy is a reflection of Sai's journey: blending humble, traditional roots with a modern culinary approach. We believe in creating dishes that are both comforting and exciting, using the freshest ingredients to craft an unforgettable dining experience. Every plate we serve is a testament to passion, perseverance, and the power of family.
            </p>
          </div>
          <div className="w-full h-full flex justify-center">
             <Image
                src="https://placehold.co/600x800.png"
                alt="The elegant interior of The Savory Spoon"
                width={500}
                height={700}
                className="rounded-lg shadow-xl object-cover"
                data-ai-hint="posh restaurant interior"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
