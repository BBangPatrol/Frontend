type FooterProps = {
  isMobile?: boolean;
};

export default function Footer({ isMobile }: FooterProps) {
  return (
    <footer
      className={`flex w-full items-start justify-between bg-yellow-02 border-t-main-04  ${isMobile ? "flex-col items-center justify-center gap-4 p-6" : "flex-row items-start justify-between py-8 px-26"}`}
    >
      <div className="flex items-center gap-4 ">
        <button
          className={`text-gray-02  ${isMobile ? "typo-sub-03" : "typo-sub-01"} `}
        >
          서비스 소개
        </button>
        <button
          className={`text-gray-02  ${isMobile ? "typo-sub-03" : "typo-sub-01"} `}
        >
          이용약관
        </button>
        <button
          className={`text-gray-01  ${isMobile ? "typo-sub-03" : "typo-body-03"} `}
        >
          개인정보처리방침
        </button>
      </div>
      <div>
        <p
          className={`text-gray-02 ${isMobile ? "typo-sub-03" : "typo-sub-01"} `}
        >
          © 2026 BBANGJI · 대전 관광공사 데이터
        </p>
      </div>
    </footer>
  );
}
