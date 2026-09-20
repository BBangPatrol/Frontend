import { Link } from "react-router-dom";
import confirmModalCheckIcon from "@/assets/images/receiptResultPage/confirm-modal-check.svg";

export default function ReviewCompleteModal({ storeId, isEdit = false }: { storeId: string; isEdit?: boolean }) {
  return (
    <section className="fixed inset-0 bg-white/85 md:bg-black/50 flex justify-center items-center">
      <div className="w-80 md:w-96 p-8 bg-white rounded-4xl shadow-2xl flex flex-col items-center gap-4 md:gap-5">
        <div className="size-20 bg-main-05 rounded-full shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)] flex justify-center items-center">
          <img src={confirmModalCheckIcon} alt="" />
        </div>
        <div className="flex flex-col gap-2 md:gap-3 items-center">
          <h3 className="text-black-01 typo-head-01">리뷰 {isEdit ? "수정" : "작성"} 완료!</h3>
          <p className="text-gray-02 typo-sub-02 md:text-sm!">리뷰가 {isEdit ? "수정" : "등록"}되었습니다.</p>
        </div>
        <Link to={`/detail/${storeId}`} replace className="w-full py-3 text-center md:py-4 bg-sub-01 rounded-xl text-white typo-head-05 shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)]">
          상세 페이지로 돌아가기
        </Link>
      </div>
    </section>
  );
}
