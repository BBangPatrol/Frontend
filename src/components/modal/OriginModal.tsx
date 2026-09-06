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
    backgroundClass: "bg-label-01-bg",
    textClass: "text-label-01-text",
  },
  rare: {
    label: "희귀",
    backgroundClass: "bg-label-02-bg",
    textClass: "text-label-02-text",
  },
  hero: {
    label: "영웅",
    backgroundClass: "bg-label-03-bg",
    textClass: "text-label-03-text",
  },
  legend: {
    label: "전설",
    backgroundClass: "bg-label-04-bg",
    textClass: "text-label-04-text",
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
          {/* 수집품 이미지 */}
          <div
            className={`
              flex items-center justify-center overflow-hidden rounded-xl
              ${currentRarity.backgroundClass}
              ${isMobile ? "h-40 w-40" : "h-48 w-48"}
            `}
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt={name || "획득한 수집품"}
                className="h-full w-full object-contain"
              />
            )}
          </div>

          {/* 텍스트 영역 */}
          <div className="flex w-full flex-col items-center gap-3 text-center">
            <span
              className={`
                rounded-full px-2 py-1
                text-caption-12-m
                ${currentRarity.backgroundClass}
                ${currentRarity.textClass}
              `}
            >
              희귀도: {currentRarity.label}
            </span>

            <div className="flex flex-col items-center gap-3">
              <p
                className={`
                  ${isMobile ? "typo-head-02" : "typo-head-01"}
                  text-gray-90
                `}
              >
                <span className={currentRarity.textClass}>
                  {name || "새로운 수집품"}
                </span>{" "}
                획득!
              </p>

              <p className="whitespace-pre-line text-body-14-r text-gray-60">
                {"새로운 수집품을 획득했습니다!\n수집품 도감에서 확인해보세요."}
              </p>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex w-full gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
                h-12 flex-1 rounded-xl bg-gray-15
                text-body-16-b text-gray-70
              "
            >
              닫기
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="
                h-12 flex-1 rounded-xl bg-sub-01
                text-body-16-b text-white shadow-button
              "
            >
              도감 확인
            </button>
          </div>
        </>
      ) : (
        <>
          {/* 영수증 인증 / 리뷰 삭제 아이콘 */}
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
