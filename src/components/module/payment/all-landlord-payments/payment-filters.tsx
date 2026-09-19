import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

import { PaymentTab, PropertyOption } from "./payment.types";

type PaymentFiltersProps = {
  activeTab: PaymentTab;
  searchTerm: string;
  selectedMonth: string;
  selectedProperty: string;
  availableMonths: string[];
  properties: PropertyOption[];
  onSearchChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onPropertyChange: (value: string) => void;
  formatBillingMonth: (month: string | null) => string;
};

export const PaymentFilters = ({
  activeTab,
  searchTerm,
  selectedMonth,
  selectedProperty,
  availableMonths,
  properties,
  onSearchChange,
  onMonthChange,
  onPropertyChange,
  formatBillingMonth,
}: PaymentFiltersProps) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tenant, property or unit..."
          className="pl-9"
        />
      </div>

      <Select
        value={selectedMonth}
        onValueChange={onMonthChange}
        disabled={activeTab === "security_deposit"}
      >
        <SelectTrigger className="w-full md:w-45">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Months</SelectItem>

          {availableMonths.map((month) => (
            <SelectItem key={month} value={month}>
              {formatBillingMonth(month)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedProperty} onValueChange={onPropertyChange}>
        <SelectTrigger className="w-full md:w-50">
          <SelectValue placeholder="Select property" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Properties</SelectItem>

          {properties.map((property) => (
            <SelectItem key={property.id} value={property.id}>
              {property.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
