import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

const Footer = () => {
  return (
    <Card className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 border-t bg-transparent">
      <CardContent className="flex flex-col md:flex-row justify-between items-center py-6">
        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold text-primary">SmartLease</h2>
          <p className="text-sm text-muted-foreground">
            Scalable property leasing platform for Bangladesh
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/about" className="text-sm hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-sm hover:underline">
            Contact
          </Link>
          <Link href="/terms" className="text-sm hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm hover:underline">
            Privacy
          </Link>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center border-t py-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} SmartLease. All rights reserved.
        </p>
      </CardFooter>
    </Card>
  );
};
export default Footer;
