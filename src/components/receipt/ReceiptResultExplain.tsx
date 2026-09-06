import alertIcon from "@/assets/images/receiptResultPage/alert.svg";
import faqIcon from "@/assets/images/receiptResultPage/faq.svg";

export default function ReceiptResultExplain() {
  return (
    <section className="p-3 flex gap-3 bg-red-50 rounded-2xl border border-red-100 md:p-5">
      <img src={alertIcon} className="self-start" />
      <div>
        <p className="text-red-800 typo-head-05 md:text-base!">내용을 다르게 인식했나요?</p>
        <p className="mt-1 text-gray-01 typo-sub-02">
          보안 및 어뷰징 방지를 위해 직접 수정할 수 없습니다.
          <br className="md:hidden" /> 결과가 다른 경우 사진을 더 선명하게
          <br className="md:hidden" /> 다시 찍어 업로드해주세요.
        </p>
        <div className="mt-3 flex gap-1.5 md:mt-5">
          <img src={faqIcon} />
          <p className="text-gray-02 typo-body-05 underline md:text-xs! md:leading-4!">계속해서 오류가 발생한다면? 관리자 문의</p>
        </div>
      </div>
    </section>
  );
}
