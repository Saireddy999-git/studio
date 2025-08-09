export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-6">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <p>&copy; {new Date().getFullYear()} b s. All rights reserved.</p>
        <p className="text-sm mt-2">
            Designed with passion by a team of food lovers.
        </p>
      </div>
    </footer>
  );
}
