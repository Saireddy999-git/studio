import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const featuredDishes = [
  {
    name: "Karam Dosa",
    description: "A spicy and crispy crepe from South India, smeared with a fiery red chutney.",
    price: "₹50",
    image: {
      src: "https://vismaifood.com/storage/app/uploads/public/39b/c7d/3bf/thumb__1200_0_0_0_auto.jpg",
      aiHint: "karam dosa"
    },
    tag: "Spicy Special"
  },
  {
    name: "Chicken Wings Biriyani",
    description: "Flavorful biriyani rice topped with succulent, spicy chicken wings.",
    price: "$25",
    image: {
      src: "https://placehold.co/600x400.png",
      aiHint: "chicken biriyani"
    },
    tag: "Fan Favorite"
  },
  {
    name: "Palakova",
    description: "A traditional Indian sweet made from solidified, sweetened milk.",
    price: "$10",
    image: {
      src: "https://placehold.co/600x400.png",
      aiHint: "palakova sweet"
    },
    tag: "Dessert"
  }
];

export default function FeaturedDishes() {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Featured Dishes</h2>
          <p className="text-lg text-muted-foreground mt-2">A taste of our finest creations, celebrated by our guests.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDishes.map((dish) => (
            <Card key={dish.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative">
                  <Image
                    src={dish.image.src}
                    alt={dish.name}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                    data-ai-hint={dish.image.aiHint}
                  />
                  <Badge variant="secondary" className="absolute top-4 right-4 bg-accent text-accent-foreground">{dish.tag}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-2xl font-headline">{dish.name}</CardTitle>
                <CardDescription className="mt-2 text-base">{dish.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <p className="text-xl font-bold text-primary">{dish.price}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
