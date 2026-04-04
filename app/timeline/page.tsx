import BorderlandTimeline from "../components/timeline";
import HybridDomainPage from "../components/domain";
import PrizeSection from "../components/prize_page";
import FAQSection from "../components/faq";
import HeroBanner from "../components/HeroBanner";

export default function MainGamePage() {
  return (
    <main className="bg-[#050508] relative flex flex-col w-screen overflow-x-hidden">
      {/* 0. Hero Banner Section */}
      <div className="w-full relative z-20 block">
        <HeroBanner />
      </div>

      {/* 1. Timeline Section */}
      <div className="w-full relative z-10 block">
        <BorderlandTimeline />
      </div>

      {/* 2. Domains Section */}
      <div className="w-full relative z-50 block bg-black">
        <HybridDomainPage />
      </div>

      {/* 3. Prize Section */}
      <div className="w-full relative z-30 block bg-black">
        <PrizeSection />
      </div>

      {/* 4. FAQ Section
      <div className="w-full relative z-40 block bg-black">
        <FAQSection />
      </div> */}
    </main>
  );
}
