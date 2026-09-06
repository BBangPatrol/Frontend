import { useState } from "react";
import DesktopDrawHeader from "../../components/collection/DesktopDrawHeader";
import DesktopDrawTitle from "../../components/collection/DesktopDrawTitle";
import DrawMainImage from "../../components/collection/DrawMainImage";
import DrawResult from "../../components/collection/DrawResult";
import MobileDrawHeader from "../../components/collection/MobileDrawHeader";
import { useResponsive } from "../../contexts/ResponsiveContext";

export default function DrawPage() {
  const [isDrawResultOpen, setIsDrawResultOpen] = useState(false);
  const { isMobile } = useResponsive();

  return (
    <main className="p-4 flex flex-col gap-11 md:max-w-104 md:mx-auto md:py-6 md:px-4 md:gap-12">
      {isMobile ? <MobileDrawHeader /> : <DesktopDrawHeader />}
      <section className="flex flex-col gap-11 md:gap-13">
        <DesktopDrawTitle />
        <DrawMainImage />
        <button
          onClick={() => setIsDrawResultOpen(true)}
          className="py-3 bg-sub-01 rounded-xl shadow-[0px_10px_15px_-3px_rgba(198,139,89,0.30)] text-white typo-head-05 md:text-lg! md:leading-5!"
        >
          100P로 뽑기
        </button>
      </section>
      {isDrawResultOpen && <DrawResult onClose={() => setIsDrawResultOpen(false)} />}
    </main>
  );
}
