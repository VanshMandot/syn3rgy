import BorderlandTimeline from "../components/timeline";
import HybridDomainPage from "../components/domain";
import PrizeSection from "../components/prize_page";

export default function MainGamePage() {
  return (
    <main className="bg-[#050508] relative flex flex-col w-screen overflow-x-hidden">
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
    </main>
  );
}
