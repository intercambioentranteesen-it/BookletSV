import { Header } from "@/components/layout/Header";
import { Closing } from "@/components/sections/Closing";
import { Flavors } from "@/components/sections/Flavors";
import { Hero } from "@/components/sections/Hero";
import { QuickFacts } from "@/components/sections/QuickFacts";
import { CostOfLiving } from "@/components/sections/cost/CostOfLiving";
import { ExploreCountry } from "@/components/sections/explore/ExploreCountry";
import { Goals } from "@/components/sections/goals/Goals";
import { YourExperience } from "@/components/sections/journey/YourExperience";
import { getSiteContent } from "@/lib/cms/get-site-content";

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <>
      <Header />
      <main id="main">
        <Hero content={content.hero} />
        <QuickFacts content={content.quickFacts} />
        <ExploreCountry content={content.explore} />
        <Flavors content={content.flavors} />
        <CostOfLiving content={content.cost} />
        <YourExperience content={content.journey} />
        <Goals content={content.goals} />
      </main>
      <Closing content={content.closing} credits={content.credits} />
    </>
  );
}
