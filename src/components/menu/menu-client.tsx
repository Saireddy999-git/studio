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
} from "@/components/ui/dialog";
import { getWinePairingSuggestions, WinePairingOutput } from "@/ai/flows/wine-pairing-suggestions";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

function WinePairingForm({ dish, onResult, onLoadingChange }: { dish: MenuItem, onResult: (result: WinePairingOutput | null, error: string | null) => void, onLoadingChange: (loading: boolean) => void }) {
  const [preferences, setPreferences] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onLoadingChange(true);
    onResult(null, null);

    try {
      const result = await getWinePairingSuggestions({
        dishDescription: `${dish.name}: ${dish.description}`,
        userPreferences: preferences,
      });
      onResult(result, null);
    } catch (error) {
      console.error(error);
      onResult(null, "Sorry, we couldn't find a pairing at this time. Please try again later.");
    } finally {
      setIsLoading(false);
      onLoadingChange(false);
    }
  };
  
  return (
     <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <Label htmlFor="preferences">Any wine preferences? (optional)</Label>
            <Textarea
              id="preferences"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="e.g., 'I prefer red wines', 'Something not too sweet'"
            />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Find Pairing
        </Button>
     </form>
  )
}


export default function MenuClient({ menu }: MenuClientProps) {
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [pairingResult, setPairingResult] = useState<WinePairingOutput | null>(null);
  const [pairingError, setPairingError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPairing = (dish: MenuItem) => {
    setSelectedDish(dish);
    setPairingResult(null);
    setPairingError(null);
  };

  const handleModalClose = () => {
    if (!isLoading) {
      setSelectedDish(null);
    }
  }

  const handleResult = (result: WinePairingOutput | null, error: string | null) => {
    setPairingResult(result);
    setPairingError(error);
  }

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
                <Button variant="outline" onClick={() => handleGetPairing(item)}>
                  Wine Pairing
                </Button>
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

      <Dialog open={!!selectedDish} onOpenChange={(open) => !open && handleModalClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">Wine Pairing for {selectedDish?.name}</DialogTitle>
            <DialogDescription>
              Let our AI sommelier suggest the perfect wine to complement your dish.
            </DialogDescription>
          </DialogHeader>
          {selectedDish && (
             <WinePairingForm dish={selectedDish} onResult={handleResult} onLoadingChange={setIsLoading} />
          )}

          {pairingResult && (
            <div className="mt-4 space-y-4 p-4 border rounded-lg bg-card">
                <h4 className="font-bold text-lg">Our Suggestions:</h4>
                <ul className="list-disc list-inside space-y-1 text-primary">
                    {pairingResult.wineSuggestions.map(wine => <li key={wine}>{wine}</li>)}
                </ul>
                <h4 className="font-bold text-lg pt-2">Why they pair well:</h4>
                <p className="text-muted-foreground">{pairingResult.reasoning}</p>
            </div>
          )}

          {pairingError && (
             <div className="mt-4 p-4 border rounded-lg bg-destructive/10 text-destructive">
                <p>{pairingError}</p>
            </div>
          )}

        </DialogContent>
      </Dialog>
    </>
  );
}
