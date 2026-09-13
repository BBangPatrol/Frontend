import headerIcon from "@/assets/images/drawPage/header-star.svg";

export default function DesktopDrawTitle() {
  return (
    <div className="hidden flex-col items-center gap-3 md:flex">
      <div className="flex gap-2">
        <img src={headerIcon} alt="" />
        <h2 className="text-3xl font-extrabold text-black-01">수집품 뽑기</h2>
      </div>
      <p className="text-gray-02 typo-body-02">100P를 사용해 새로운 빵집 수집품을 획득하세요!</p>
    </div>
  );
}
