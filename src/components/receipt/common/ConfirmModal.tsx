import confirmModalCheckIcon from "@/assets/images/receiptResultPage/confirm-modal-check.svg";

export default function ConfirmModal({ onClose }: { onClose: () => void }) {
  return (
    <section className="fixed inset-0 bg-white/85 md:bg-black/50 flex justify-center items-center">
      <div className="w-80 md:w-96 p-8 bg-white rounded-4xl shadow-2xl flex flex-col items-center gap-4 md:gap-5">
        <div className="size-20 bg-main-05 rounded-full shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)] flex justify-center items-center">
          <img src={confirmModalCheckIcon} />
        </div>
        <div className="flex flex-col gap-2 md:gap-3 items-center">
          <h3 className="text-black-01 typo-head-01">영수증 인증 완료!</h3>
          <p className="text-gray-02 typo-sub-02 md:text-sm!">00포인트가 적립되었습니다.</p>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-2">
          <button className="py-3 md:py-4 md:order-2 md:flex-1 bg-sub-01 rounded-xl text-white typo-head-05 shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)]">포인트 확인하기</button>
          <button onClick={onClose} className="py-3 md:py-4 md:order-1 md:flex-1 bg-gray-04 rounded-xl text-gray-01 typo-head-05">
            닫기
          </button>
        </div>
      </div>
    </section>
  );
}
