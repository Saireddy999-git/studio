import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Contact & Reservations</h2>
          <p className="text-lg text-muted-foreground mt-2">We'd love to hear from you. Reach out for inquiries or to book your table.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-headline">Get in Touch</h3>
            <div className="flex items-center gap-4">
              <MapPin className="h-6 w-6 text-primary" />
              <span>Hyderabad, India</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-6 w-6 text-primary" />
              <span>+91 7036094121</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <span>saichandrareddy@gmail.com</span>
            </div>
            <h3 className="text-2xl font-bold font-headline pt-6">Hours</h3>
            <p><strong>Dinner:</strong> Tuesday - Sunday, 5:00 PM - 10:00 PM</p>
            <p><strong>Brunch:</strong> Saturday - Sunday, 11:00 AM - 3:00 PM</p>
            <p>Closed Mondays</p>
          </div>
          <div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message or reservation request..." />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
