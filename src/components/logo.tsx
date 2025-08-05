import { UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="p-2 bg-primary text-primary-foreground rounded-full group-hover:bg-primary/90 transition-colors">
        <UtensilsCrossed className="h-6 w-6" />
      </div>
      <span className="text-2xl font-headline font-bold text-primary">
        The Savory Spoon
      </span>
    </Link>
  );
}
