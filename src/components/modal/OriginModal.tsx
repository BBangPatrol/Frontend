// assets
import check from "../../assets/icon/check-sub-01.svg";
import trash from "../../assets/icon/trash-red.svg";

type Props = {
  type: "receipt" | "delete" | "collection";
  isMobile: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function OriginModal({
  type,
  isMobile,
  onClose,
  onConfirm,
}: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 bg-white rounded-4xl shadow-dropdown 
        ${isMobile ? "w-78" : "w-[384px]"}
        ${isMobile ? (type === "collection" ? "gap-6" : "gap-4") : type === "collection" ? "gap-8" : "gap-5"}
        
        `}
    >
      {type === "receipt" || type === "delete" ? (
        <>
          <div
            className={`flex items-center justify-center border-2
          ${isMobile ? "w-20 h-20" : "w-24 h-24"}
          ${type === "receipt" ? "bg-main-05 border-main-04" : "bg-[#fef2f2] border-[#FEE2E2]"}
          rounded-full
        `}
          >
            <img
              src={type === "receipt" ? check : trash}
              alt={type === "receipt" ? "Receipt" : "Delete"}
              className={`w-full h-full p-4 ${isMobile ? "p-2" : ""}`}
            />
          </div>
          <div
            className={`flex flex-col items-center justify-center 
          ${isMobile ? "gap-4" : "gap-2"}
          `}
          >
            <p className={`${isMobile ? " typo-head-01" : "typo-head-02"}`}>
              {type === "receipt"
                ? "영수증 인증 완료!"
                : "리뷰를 삭제하시겠습니까?"}
            </p>
            <p>
              {type === "receipt"
                ? "00포인트가 적립되었습니다. 리뷰를 작성하고 00포인트를 추가로 적립하세요!"
                : "삭제된 리뷰는 복구되지 않습니다"}
            </p>
          </div>
          <div></div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
