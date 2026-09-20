import { Link } from "react-router-dom";

type FooterProps = {
  isMobile?: boolean;
};

export default function Footer({ isMobile }: FooterProps) {
  return (
    <footer
      className={`mt-auto flex w-full shrink-0 items-start justify-between bg-yellow-02 border-t-main-04  ${isMobile ? "flex-col items-center justify-center gap-4 p-6" : "flex-row items-start justify-between py-8 px-26"}`}
    >
      <div className="flex items-center gap-4 ">
        <Link to="/about" className={`text-gray-02  ${isMobile ? "typo-sub-03" : "typo-sub-01"} `}>
          서비스 소개
        </Link>
        <Link to="/terms" className={`text-gray-02  ${isMobile ? "typo-sub-03" : "typo-sub-01"} `}>
          이용약관
        </Link>
        <Link to="/privacy" className={`text-gray-01  ${isMobile ? "typo-sub-03" : "typo-body-03"} `}>
          개인정보처리방침
        </Link>
      </div>
      <div>
        <p className={`text-gray-02 ${isMobile ? "typo-sub-03" : "typo-sub-01"} `}>© 2026 빵범대</p>
      </div>
    </footer>
  );
}
