import cameraIcon from "@/assets/images/detailPage/camera.svg";
import shareIcon from "@/assets/images/detailPage/share.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

export default function DetailFunctionButtons({ storeId }: { storeId: string }) {
  const isLoggedIn = useIsLoggedIn();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;

    const timeoutId = window.setTimeout(() => setIsCopied(false), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [isCopied]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
    } catch (error) {
      console.error("링크 복사에 실패했습니다.", error);
    }
  };

  return (
    <div className="p-3 bg-white rounded-xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] inline-flex flex-col gap-2 md:w-full md:p-6 md:rounded-3xl md:gap-4">
      {isLoggedIn ? (
        <Link to={`/receipt/verify/${storeId}`} className="py-3 w-full bg-sub-01 rounded-xl shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)] inline-flex justify-center items-center gap-2 md:py-4 md:rounded-2xl">
          <img src={cameraIcon} />
          <p className="text-white typo-head-05 shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)] md:text-lg! md:font-bold! md:leading-5!">영수증으로 방문 인증</p>
        </Link>
      ) : (
        <button className="py-3 w-full bg-sub-01 rounded-xl shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)] inline-flex justify-center items-center gap-2 md:py-4 md:rounded-2xl">
          <img src={cameraIcon} />
          <p className="text-white typo-head-05 shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)] md:text-lg! md:font-bold! md:leading-5!">로그인하고 방문 인증하기</p>
        </button>
      )}
      <button type="button" onClick={handleShare} className="w-full py-3 rounded-2xl border border-offset-[-1px] border-gray-03 inline-flex justify-center items-center md:py-4">
        <span className="grid" aria-live="polite">
          <span className={`col-start-1 row-start-1 inline-flex justify-center items-center gap-2 transition-all duration-300 ${isCopied ? "pointer-events-none opacity-0 -translate-y-1 scale-95" : "opacity-100 translate-y-0 scale-100"}`}>
            <img src={shareIcon} alt="" />
            <span className="typo-head-05 text-gray-02 md:text-base! md:font-bold! md:leading-5.5!">공유</span>
          </span>
          <span className={`col-start-1 row-start-1 typo-head-05 text-sub-01 transition-all duration-300 md:text-base! md:font-bold! md:leading-5.5! ${isCopied ? "opacity-100 translate-y-0 scale-100" : "pointer-events-none opacity-0 translate-y-1 scale-95"}`}>
            링크가 복사되었습니다
          </span>
        </span>
      </button>
    </div>
  );
}
