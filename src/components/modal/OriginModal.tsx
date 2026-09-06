// assets
import check from "../../assets/icon/check-sub-01.svg";
import trash from "../../assets/icon/trash-red.svg";

type ModalType = "receipt" | "delete" | "collection";

type Rarity = "normal" | "rare" | "hero" | "legend";

type Props = {
  type: ModalType;
  isMobile: boolean;
  onClose: () => void;
  onConfirm: () => void;

  // type="collection"일 때 사용
  imageUrl?: string;
  name?: string;
  rarity?: Rarity;
};

const rarityStyle: Record<
  Rarity,
  {
    label: string;
    backgroundClass: string;
    textClass: string;
  }
> = {
  normal: {
    label: "일반",
    backgroundClass: "bg-label-bg-01",
    textClass: "text-label-text-01",
  },
  rare: {
    label: "희귀",
    backgroundClass: "bg-label-bg-02",
    textClass: "text-label-text-02",
  },
  hero: {
    label: "영웅",
    backgroundClass: "bg-label-bg-03",
    textClass: "text-label-text-03",
  },
  legend: {
    label: "전설",
    backgroundClass: "bg-label-bg-04",
    textClass: "text-label-text-04",
  },
};

export default function OriginModal({
  type,
  isMobile,
  onClose,
  onConfirm,
  imageUrl,
  name,
  rarity = "normal",
}: Props) {
  const currentRarity = rarityStyle[rarity];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`
        flex flex-col items-center justify-center
        rounded-4xl bg-white p-8 shadow-dropdown
        ${isMobile ? "w-78" : "w-96"}
        ${
          isMobile
            ? type === "collection"
              ? "gap-6"
              : "gap-4"
            : type === "collection"
              ? "gap-8"
              : "gap-5"
        }
      `}
    >
      {type === "collection" ? (
        <>
          {/* 수집품 이미지 영역 */}
          <div
            className={`
              relative isolate flex items-center justify-center
              ${isMobile ? "h-40 w-40" : "h-48 w-48"}
            `}
          >
            {/* 희귀도별 흐림 배경 */}
            <div
              aria-hidden="true"
              className={`
                absolute inset-5 rounded-full
                blur-[48px]
                ${currentRarity.backgroundClass}
              `}
            />

            {/* 수집품 이미지 */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt={name || "획득한 수집품"}
                className="
                  relative z-10
                  h-full w-full
                  object-contain
                "
              />
            )}
          </div>

          {/* 수집품 안내 영역 */}
          <div className="flex w-full flex-col items-center gap-3 text-center">
            {/* 희귀도 라벨 */}
            <span
              className={`
                rounded-full px-2 py-1
                ${isMobile ? "typo-body-04" : "typo-body-03"}
                ${currentRarity.backgroundClass}
                ${currentRarity.textClass}
              `}
            >
              희귀도: {currentRarity.label}
            </span>

            <div
              className={`flex flex-col items-center gap-3 ${isMobile ? "gap-2" : "gap-3"}`}
            >
              <p
                className={`
                  text-black-01
                  ${isMobile ? "typo-head-02" : "typo-head-01"}
                `}
              >
                <span className={currentRarity.textClass}>
                  {name || "새로운 수집품"}
                </span>
                획득!
              </p>

              <p
                className={`whitespace-pre-line ${isMobile ? "typo-sub-02" : "typo-sub-01"} text-gray-02`}
              >
                {"새로운 수집품을 획득했습니다!\n수집품 도감에서 확인해보세요."}
              </p>
            </div>
          </div>

          {/* 버튼 영역 */}
          {isMobile ? (
            <div className={`flex w-full gap-2 flex-col`}>
              <button
                type="button"
                onClick={onConfirm}
                className={`
                rounded-xl h-10.5 shadow-button
                bg-sub-01 typo-head-04 text-white
              `}
              >
                도감 확인
              </button>
              <button
                type="button"
                onClick={onClose}
                className={`
                h-10.5 rounded-xl
                bg-gray-04 typo-head-04 text-gray-01
              `}
              >
                닫기
              </button>
            </div>
          ) : (
            <div className={`flex w-full gap-3}`}>
              <button
                type="button"
                onClick={onClose}
                className={`
                h-11.5 flex-1 rounded-xl
                bg-gray-04 typo-head-04 text-gray-01
                
              `}
              >
                닫기
              </button>

              <button
                type="button"
                onClick={onConfirm}
                className={`
                flex-1 rounded-xl
                bg-sub-01 typo-head-04 text-white
                shadow-button
                h-11.5
              `}
              >
                도감 확인
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          {/* 영수증 인증 또는 리뷰 삭제 아이콘 */}
          <div
            className={`
              flex items-center justify-center rounded-full border-2
              ${isMobile ? "h-20 w-20" : "h-24 w-24"}
              ${
                type === "receipt"
                  ? "border-main-04 bg-main-05"
                  : "border-[#FEE2E2] bg-[#FEF2F2]"
              }
            `}
          >
            <img
              src={type === "receipt" ? check : trash}
              alt={type === "receipt" ? "영수증 인증 완료" : "리뷰 삭제"}
              className={isMobile ? "h-full w-full p-2" : "h-full w-full p-4"}
            />
          </div>

          {/* 안내 문구 */}
          <div
            className={`
              flex flex-col items-center justify-center text-center
              ${isMobile ? "gap-4" : "gap-2"}
            `}
          >
            <p className={isMobile ? "typo-head-01" : "typo-head-02"}>
              {type === "receipt"
                ? "영수증 인증 완료!"
                : "리뷰를 삭제하시겠습니까?"}
            </p>

            <p className="text-body-14-r text-gray-60">
              {type === "receipt"
                ? "00포인트가 적립되었습니다. 리뷰를 작성하고 00포인트를 추가로 적립하세요!"
                : "삭제된 리뷰는 복구되지 않습니다."}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
