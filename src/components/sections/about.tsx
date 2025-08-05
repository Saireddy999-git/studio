import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-12 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-full flex justify-center">
             <Image
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="The elegant interior of Mudu Kalalu"
                width={500}
                height={700}
                className="rounded-lg shadow-xl object-cover"
                data-ai-hint="elegant restaurant interior"
            />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-headline">From a Dream to Your Table</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Mudu Kalalu began with a simple dream. Our founder, Sai, a young man from a middle-class background, envisioned a place where exquisite food could be enjoyed by everyone. At just 21 years old, with unwavering support from his family, he turned that dream into a reality.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Our philosophy is a reflection of Sai's journey: blending humble, traditional roots with a modern culinary approach. We believe in creating dishes that are both comforting and exciting, using the freshest ingredients to craft an unforgettable dining experience. Every plate we serve is a testament to passion, perseverance, and the power of family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
