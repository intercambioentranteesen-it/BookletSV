import { Header } from "@/components/layout/Header";
import { Closing } from "@/components/sections/Closing";
import { Hero } from "@/components/sections/Hero";
import { CostOfLiving } from "@/components/sections/cost/CostOfLiving";
import { ExploreCountry } from "@/components/sections/explore/ExploreCountry";
import { YourExperience } from "@/components/sections/journey/YourExperience";
import { getSiteContent } from "@/lib/cms/get-site-content";

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <>
      <Header />
      <main id="main">
        <Hero content={content.hero} />
        <ExploreCountry content={content.explore} />
        <CostOfLiving content={content.cost} />
        <YourExperience content={content.journey} />
      </main>
      <Closing content={content.closing} />
    </>
  );
}
