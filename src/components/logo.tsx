import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="p-2 bg-primary text-primary-foreground rounded-md group-hover:bg-primary/90 transition-colors flex items-center justify-center font-headline text-xl font-bold">
        KR
      </div>
      <span className="text-2xl font-headline font-bold text-primary">
        Kadapa Reddy
      </span>
    </Link>
  );
}
