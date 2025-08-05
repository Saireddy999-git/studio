import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const featuredDishes = [
  {
    name: "Seared Scallops",
    description: "With saffron risotto and a citrus buerre blanc.",
    price: "$32",
    image: {
      src: "https://placehold.co/600x400.png",
      aiHint: "seared scallops risotto"
    },
    tag: "Chef's Special"
  },
  {
    name: "Wagyu Beef Burger",
    description: "Brioche bun, truffle aioli, aged cheddar, and crispy onions.",
    price: "$28",
    image: {
      src: "https://placehold.co/600x400.png",
      aiHint: "wagyu burger"
    },
    tag: "Fan Favorite"
  },
  {
    name: "Burrata & Prosciutto",
    description: "Heirloom tomatoes, balsamic glaze, and fresh basil.",
    price: "$22",
    image: {
      src: "https://placehold.co/600x400.png",
      aiHint: "burrata prosciutto appetizer"
    },
    tag: "Seasonal"
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
