import PageHeader from "../../common/PageHeader";
import checkIcon from "@/assets/images/receiptResultPage/check.svg";
import confirmIcon from "@/assets/images/receiptResultPage/confirm.svg";
import retryIcon from "@/assets/images/receiptResultPage/retry.svg";
import alertIcon from "@/assets/images/receiptResultPage/alert.svg";
import faqIcon from "@/assets/images/receiptResultPage/faq.svg";
import ConfirmModal from "../common/ConfirmModal";

type MobileReceiptResultPageProps = {
  isConfirmOpen: boolean;
  onConfirm: () => void;
  onCloseConfirm: () => void;
};

export default function DesktopReceiptResultPage({ isConfirmOpen, onConfirm, onCloseConfirm }: MobileReceiptResultPageProps) {
  return (
    <main className="p-6 max-w-200 mx-auto flex flex-col gap-8">
      <PageHeader title="영수증 분석 완료" icon={checkIcon} subTitle="아래 인식된 정보를 확인해주세요. 결과는 임의로 수정할 수 없습니다." />
      <Result />
      <InputButtons onConfirm={onConfirm} />
      <Explain />
      {isConfirmOpen && <ConfirmModal onClose={onCloseConfirm} />}
    </main>
  );
}

function Result() {
  return (
    <section>
      <dl className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <dt className="text-gray-01 typo-head-03">상호명</dt>
          <dd className="px-4 py-3 bg-gray-04 rounded-xl border border-gray-03 text-black-01 typo-body-02">성심당 본점</dd>
        </div>
        <div className="flex flex-col gap-3">
          <dt className="text-gray-01 typo-head-03">일자</dt>
          <dd className="px-4 py-3 bg-gray-04 rounded-xl border border-gray-03 text-black-01 typo-body-02">2026-05-23</dd>
        </div>
        <div className="flex flex-col gap-3">
          <dt className="text-gray-01 typo-head-03">금액</dt>
          <dd className="px-4 py-3 bg-gray-04 rounded-xl border border-gray-03 text-black-01 typo-body-02">12,100원</dd>
        </div>
        <div className="flex flex-col gap-3">
          <dt className="text-gray-01 typo-head-03">메뉴</dt>
          <dd>
            <ul className="px-4 py-3 bg-gray-04 rounded-xl border border-gray-03 text-black-01 typo-body-02">
              <li>튀김소보로 2개</li>
              <li>애플파이 1개</li>
              <li>명란바게트 1개</li>
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  );
}

function InputButtons({ onConfirm }: { onConfirm: () => void }) {
  return (
    <section className="flex gap-3">
      <button className="py-4 flex-3 flex gap-1 justify-center bg-gray-04 rounded-xl">
        <img src={retryIcon} />
        <p className="text-gray-01 typo-head-03">다시 업로드</p>
      </button>
      <button
        onClick={onConfirm}
        className="py-4 flex-5 flex gap-1 justify-center bg-sub-01 rounded-xl shadow-[0px_4px_6px_-4px_rgba(198,139,89,0.20)] shadow-[0px_10px_15px_-3px_rgba(198,139,89,0.20)]"
      >
        <img src={confirmIcon} />
        <p className="text-white typo-head-03">이대로 인증</p>
      </button>
    </section>
  );
}

function Explain() {
  return (
    <section className="p-5 flex gap-3 bg-red-50 rounded-2xl border border-red-100">
      <img src={alertIcon} className="self-start" />
      <div>
        <p className="text-red-800 typo-head-04">내용을 다르게 인식했나요?</p>
        <p className="mt-1 text-gray-01 typo-sub-02">보안 및 어뷰징 방지를 위해 직접 수정할 수 없습니다. 결과가 다른 경우 사진을 더 선명하게 다시 찍어 업로드해주세요.</p>
        <div className="mt-5 flex gap-1.5">
          <img src={faqIcon} />
          <p className="text-gray-02 typo-body-04 underline">계속해서 오류가 발생한다면? 관리자 문의</p>
        </div>
      </div>
    </section>
  );
}
