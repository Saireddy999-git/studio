"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getRecipe, RecipeOutput } from "@/ai/flows/recipe-generator";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: {
    src: string;
    aiHint: string;
  };
}

interface Menu {
  appetizers: MenuItem[];
  mainCourses: MenuItem[];
  desserts: MenuItem[];
  drinks?: MenuItem[];
}

interface MenuClientProps {
  menu: Menu;
}

function RecipeDialog({ dish }: { dish: MenuItem }) {
  const [recipe, setRecipe] = useState<RecipeOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchRecipe = async () => {
    if (recipe) return; // Don't fetch if already loaded
    setIsLoading(true);
    setError(null);

    try {
      const result = await getRecipe({
        dishName: dish.name,
        dishDescription: dish.description,
      });
      setRecipe(result);
    } catch (err) {
      console.error(err);
      setError("Sorry, we couldn't fetch the recipe at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleFetchRecipe}>
          How it's Made
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">How to make {dish.name}</DialogTitle>
          <DialogDescription>
            Our chefs share the secret to this delicious dish.
          </DialogDescription>
        </DialogHeader>
        {isLoading && (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                <span>Generating Recipe...</span>
            </div>
        )}
        {error && (
            <div className="mt-4 p-4 border rounded-lg bg-destructive/10 text-destructive">
            <p>{error}</p>
            </div>
        )}
        {recipe && (
          <div className="mt-4 space-y-6">
            <div>
              <h4 className="font-bold text-lg">Ingredients:</h4>
              <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg">Steps:</h4>
              <ol className="list-decimal list-inside space-y-2 mt-2 text-muted-foreground">
                {recipe.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function MenuClient({ menu }: MenuClientProps) {

  const renderMenuCategory = (title: string, items: MenuItem[] | undefined) => {
    if (!items || items.length === 0) return null;
    return (
      <div key={title}>
        <h2 className="text-3xl md:text-4xl font-bold font-headline my-8 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <Card key={item.name} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative">
                  <Image
                    src={item.image.src}
                    alt={item.name}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover aspect-[3/2]"
                    data-ai-hint={item.image.aiHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                 <CardTitle className="font-headline">{item.name}</CardTitle>
                <CardDescription className="mt-2">{item.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-6 pt-0">
                <span className="text-lg font-bold text-primary">{item.price}</span>
                <RecipeDialog dish={item} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold font-headline">Our Menu</h1>
            <p className="text-lg text-muted-foreground mt-2">Discover our culinary creations, crafted with the freshest ingredients.</p>
          </div>
          {renderMenuCategory("Appetizers", menu.appetizers)}
          {renderMenuCategory("Main Courses", menu.mainCourses)}
          {renderMenuCategory("Desserts", menu.desserts)}
          {renderMenuCategory("Traditional Drinks", menu.drinks)}
        </div>
      </section>
    </>
  );
}
