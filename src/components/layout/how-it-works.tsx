import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  ClipboardCheck,
  FileSignature,
  CreditCard,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Browse",
      icon: Search,
      description: "Explore available properties tailored to your needs.",
    },
    {
      title: "Apply",
      icon: ClipboardCheck,
      description: "Submit your application quickly with guided forms.",
    },
    {
      title: "Sign Lease",
      icon: FileSignature,
      description: "Secure your rental with a digital contract.",
    },
    {
      title: "Payment",
      icon: CreditCard,
      description: "Pay deposits or rent online when required.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-center mb-10 text-[#ff9638]">
        How It Works
      </h2>
      <div className="flex flex-col md:flex-row md:justify-between gap-8">
        {steps.map((step, index) => (
          <Card
            key={step.title}
            className="flex-1 border border-border/50 rounded-xl shadow-sm hover:shadow-lg transition duration-300 bg-transparent"
          >
            <CardHeader className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#ff9638]/10 mb-3">
                <step.icon className="h-6 w-6 text-[#ff9638]" />
              </div>
              <CardTitle className="text-lg font-semibold">
                {index + 1}. {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground text-center">
              {step.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
