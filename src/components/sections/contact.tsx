"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function Contact() {
  return (
    <section id="contact" className="relative py-12 md:py-24 text-white">
       <Image
        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="A cozy restaurant setting"
        fill={true}
        style={{objectFit: 'cover'}}
        className="brightness-50"
        data-ai-hint="restaurant background"
      />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">Contact Us</h2>
          <p className="text-lg text-primary-foreground/90 mt-2">We'd love to hear from you. Reach out for any inquiries.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
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
                <span>saichandrareddy6675@gmail.com</span>
                </div>
            </div>
            <div>
                <h3 className="text-2xl font-bold font-headline">Hours</h3>
                <p><strong>Dinner:</strong> Tuesday - Sunday, 5:00 PM - 10:00 PM</p>
                <p><strong>Brunch:</strong> Saturday - Sunday, 11:00 AM - 3:00 PM</p>
                <p>Closed Mondays</p>
            </div>
            </div>
        </div>
      </div>
    </section>
  );
}
