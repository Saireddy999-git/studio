
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2, User, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleTableReservation } from "@/ai/flows/table-reservation-flow";
import { supabase } from "@/lib/supabaseClient";

const tables = [
  // 2-person tables
  { id: "T1", capacity: 2, position: "top-8 left-8" },
  { id: "T2", capacity: 2, position: "top-8 left-28" },
  { id: "T3", capacity: 2, position: "top-8 right-28" },
  { id: "T4", capacity: 2, position: "top-8 right-8" },
  // 4-person tables
  { id: "T5", capacity: 4, position: "top-40 left-8" },
  { id: "T6", capacity: 4, position: "top-40 right-8" },
  { id: "T7", capacity: 4, position: "bottom-8 left-1/2 -translate-x-1/2" },
  // 6-person tables
  { id: "T8", capacity: 6, position: "bottom-8 left-8" },
  { id: "T9", capacity: 6, position: "bottom-8 right-8" },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  guests: z.string().min(1, { message: "Please select the number of guests." }),
  date: z.date({
    required_error: "A date is required.",
  }),
  time: z.string().min(1, { message: "Please select a time." }),
  tableId: z.string().min(1, { message: "Please select a table." }),
});

export default function BookATable() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      guests: "",
      time: "",
      tableId: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleTableClick = (tableId: string) => {
    setSelectedTable(tableId);
    form.setValue("tableId", tableId, { shouldValidate: true });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // 1. Save to Supabase
      const { error: supabaseError } = await supabase
        .from('reservations')
        .insert([
          {
            name: values.name,
            email: values.email,
            guests: parseInt(values.guests, 10),
            date: format(values.date, "yyyy-MM-dd"),
            time: values.time,
            table_id: values.tableId,
          },
        ]);

      if (supabaseError) {
        throw supabaseError;
      }

      // 2. Send email notification (existing functionality)
      const result = await handleTableReservation({
        ...values,
        date: format(values.date, "PPP"),
        guests: parseInt(values.guests, 10),
      });

      // 3. Show success toast and reset form
      toast({
        title: "Reservation Successful!",
        description: "Your table has been booked. " + result.confirmation,
      });
      form.reset();
      setSelectedTable(null);

    } catch (error: any) {
      console.error("Reservation failed:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "There was a problem with your reservation. Please try again.",
      });
    }
  }

  const timeSlots = [
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
  ];

  return (
    <section id="book-a-table" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">
            Book a Table
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            Select your table and book your spot for an unforgettable dining experience.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-bold font-headline mb-4">
              Restaurant Layout
            </h3>
            <div className="relative w-full h-96 bg-card rounded-lg border-2 border-dashed p-4">
              {tables.map((table) => {
                const isSelected = selectedTable === table.id;
                const Icon = table.capacity > 2 ? Users : User;
                return (
                  <button
                    key={table.id}
                    onClick={() => handleTableClick(table.id)}
                    className={cn(
                      "absolute flex flex-col items-center justify-center bg-secondary hover:bg-primary/20 text-secondary-foreground transition-colors",
                      table.capacity === 2 && "w-16 h-16 rounded-full",
                      table.capacity === 4 && "w-20 h-20 rounded-md",
                      table.capacity === 6 && "w-32 h-20 rounded-lg",
                      isSelected && "bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary",
                      table.position
                    )}
                  >
                    <Icon className="h-5 w-5 mb-1" />
                    <span className="text-xs font-bold">{table.id}</span>
                    <span className="text-xs">({table.capacity} seats)</span>
                  </button>
                );
              })}
               <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-muted px-4 py-1 rounded-full text-sm">
                Entrance
               </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold font-headline mb-4">
              Reservation Details
            </h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <FormField
                        control={form.control}
                        name="guests"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Number of Guests</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select number of guests" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {[...Array(9)].map((_, i) => (
                                        <SelectItem key={i + 1} value={`${i + 1}`}>
                                            {i + 1} Guest{i > 0 && 's'}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                     <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Time</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a time slot" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {timeSlots.map(slot => (
                                        <SelectItem key={slot} value={slot}>
                                            {slot}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </div>

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0,0,0,0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                    control={form.control}
                    name="tableId"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">Selected Table</FormLabel>
                          <FormControl>
                            <Input {...field} className="sr-only" />
                          </FormControl>
                           <FormMessage className="text-center text-destructive" />
                        </FormItem>
                    )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? "Booking..." : "Book Your Table"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
