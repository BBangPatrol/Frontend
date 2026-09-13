import confirmIcon from "@/assets/images/receiptResultPage/confirm.svg";
import retryIcon from "@/assets/images/receiptResultPage/retry.svg";

type ReceiptResultButtonsProps = {
  isPending: boolean;
  onConfirm: () => void;
  onRetry: () => void;
};

export default function ReceiptResultButtons({ isPending, onConfirm, onRetry }: ReceiptResultButtonsProps) {
  return (
    <section className="flex flex-col gap-3 md:flex-row">
      <button type="button" onClick={onConfirm} disabled={isPending} className="py-3 flex gap-1 justify-center bg-sub-01 rounded-xl shadow-[0px_10px_15px_-3px_rgba(198,139,89,0.20)] disabled:opacity-50 md:order-2 md:flex-5 md:py-4">
        <img src={confirmIcon} />
        <p className="text-white typo-head-05 md:text-lg! md:leading-5!">{isPending ? "인증 중..." : "이대로 인증"}</p>
      </button>
      <button type="button" onClick={onRetry} disabled={isPending} className="py-3 flex gap-1 justify-center bg-gray-04 rounded-xl disabled:opacity-50 md:order-1 md:flex-3 md:py-4">
        <img src={retryIcon} />
        <p className="text-gray-01 typo-head-05 md:text-lg! md:leading-5!">다시 업로드</p>
      </button>
    </section>
  );
}
