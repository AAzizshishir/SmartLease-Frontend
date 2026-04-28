import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, Wallet, MapPinHouse, ClipboardList } from "lucide-react";

const KeyFeatures = () => {
  const features = [
    {
      title: "Secure Contracts",
      icon: FileCheck,
      description:
        "Digitally signed agreements with built‑in safeguards for tenants and landlords.",
    },
    {
      title: "Automated Rent",
      icon: Wallet,
      description:
        "Streamlined rent collection and reminders — no manual tracking needed.",
    },
    {
      title: "Localized Listings",
      icon: MapPinHouse,
      description:
        "Tailored property options across Bangladesh, matching local needs and budgets.",
    },
    {
      title: "Easy Applications",
      icon: ClipboardList,
      description:
        "Apply in minutes with a simple, guided process that saves time.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-center mb-8 text-[#ff9638]">
        Key Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="border border-border/50 rounded-xl shadow-sm hover:shadow-lg transition duration-300 bg-transparent"
          >
            <CardHeader className="flex flex-col items-center text-center">
              <feature.icon className="h-10 w-10 text-[#ff9638] mb-2" />
              <CardTitle className="text-lg font-semibold">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground text-center">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures;
