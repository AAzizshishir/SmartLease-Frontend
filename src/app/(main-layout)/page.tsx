import Banner from "@/components/layout/Banner";
import BestDeals from "@/components/layout/Best-deals";
import HowItWorks from "@/components/layout/how-it-works";
import KeyFeatures from "@/components/layout/key-features";

export default function Home() {
  return (
    <div>
      <Banner />
      <BestDeals />
      <KeyFeatures />
      <HowItWorks />
    </div>
  );
}
