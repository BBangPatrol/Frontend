import aiIcon from "@/assets/images/detailPage/ai.svg";
import { useEffect, useState } from "react";

export default function ReviewSummary({ summary, storeId }: { summary: string; storeId: string }) {
  const storageKey = `review-summary-animation:${storeId}`;
  const [hasPlayed] = useState(() => sessionStorage.getItem(storageKey) === "true");
  const [isLoading, setIsLoading] = useState(!hasPlayed);
  const [visibleLength, setVisibleLength] = useState(hasPlayed ? summary.length : 0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (hasPlayed) return;

    const timeoutId = window.setTimeout(() => setIsLoading(false), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [hasPlayed]);

  useEffect(() => {
    if (hasPlayed || isLoading) return;

    const intervalId = window.setInterval(() => {
      setVisibleLength((currentLength) => {
        if (currentLength >= summary.length) {
          window.clearInterval(intervalId);
          return currentLength;
        }
        return currentLength + 1;
      });
    }, 30);

    return () => window.clearInterval(intervalId);
  }, [hasPlayed, isLoading, summary]);

  useEffect(() => {
    if (hasPlayed || visibleLength < summary.length) return;
    sessionStorage.setItem(storageKey, "true");
  }, [hasPlayed, storageKey, summary.length, visibleLength]);

  useEffect(() => {
    if (!hasPlayed) return;

    const frameId = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(frameId);
  }, [hasPlayed]);

  const isTyping = !hasPlayed && visibleLength < summary.length;
  const summaryAnimationClass = hasPlayed
    ? isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-1"
    : isLoading
      ? "pointer-events-none opacity-0 translate-y-1"
      : "opacity-100 translate-y-0";

  return (
    <div className="flex flex-col p-3 gap-3 border border-main-05 bg-yellow-02 rounded-xl md:p-5 md:gap-4 md:rounded-2xl">
      <h3 className="flex gap-1 text-black-01 typo-body-03 md:gap-2 md:text-base! md:leading-5.5!">
        <img src={aiIcon} className={`size-4 md:size-auto ${isLoading ? "animate-pulse" : ""}`} />
        AI 리뷰 요약
      </h3>
      <div className="grid rounded-xl border border-main-05 bg-white/70 px-4 py-3 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]">
        <p
          className={`col-start-1 row-start-1 flex items-center text-gray-02 typo-body-03 transition-all duration-500 ${isLoading ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"}`}
        >
          AI가 리뷰를 요약하고 있어요...
        </p>
        <p
          aria-label={summary}
          className={`col-start-1 row-start-1 text-gray-01 typo-body-03-des leading-6 transition-all duration-500 ${summaryAnimationClass}`}
        >
          <span aria-hidden="true">{summary.slice(0, visibleLength)}</span>
          {isTyping && !isLoading && <span aria-hidden="true" className="ml-0.5 animate-pulse text-sub-01">|</span>}
        </p>
      </div>
    </div>
  );
}
