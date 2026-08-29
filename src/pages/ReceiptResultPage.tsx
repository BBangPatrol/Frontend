import PageHeader from "../components/common/PageHeader";

// images
import checkIcon from "@/assets/images/receiptResultPage/check.svg";
import confirmIcon from "@/assets/images/receiptResultPage/confirm.svg";
import retryIcon from "@/assets/images/receiptResultPage/retry.svg";
import alertIcon from "@/assets/images/receiptResultPage/alert.svg";
import faqIcon from "@/assets/images/receiptResultPage/faq.svg";
import confirmModalCheckIcon from "@/assets/images/receiptResultPage/confirm-modal-check.svg";
import { useState, type Dispatch, type SetStateAction } from "react";

export default function ReceiptResultPage() {
  const [confirm, setConfirm] = useState(false);

  return (
    <TempContainer>
      <PageHeader title="영수증 분석 완료" icon={checkIcon} subTitle="아래 파싱된 정보를 확인해주세요. 결과는 임의로 수정할 수 없습니다." />
      <Result />
      <InputButtons setConfirm={setConfirm} />
      <Explain />
      {confirm && <ConfirmModal />}
    </TempContainer>
  );
}

function Result() {
  return (
    <section>
      <dl className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <dt className="text-gray-01 text-sm font-extrabold">상호명</dt>
          <dd className="px-4 py-3 bg-gray-04 rounded-xl border border-gray-03 text-black-01 text-xs font-bold">성심당 본점</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-gray-01 text-sm font-extrabold">일자</dt>
          <dd className="px-4 py-3 bg-gray-04 rounded-xl border border-gray-03 text-black-01 text-xs font-bold">2026-05-23</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-gray-01 text-sm font-extrabold">금액</dt>
          <dd className="px-4 py-3 bg-gray-04 rounded-xl border border-gray-03 text-black-01 text-xs font-bold">12,100원</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-gray-01 text-sm font-extrabold">메뉴</dt>
          <dd>
            <ul className="px-4 py-3 bg-gray-04 rounded-xl border border-gray-03 text-black-01 text-xs font-bold">
              <li>튀김소보로 2개</li>
              <li>판타롱부추빵 1개</li>
              <li>명란바게트 1개</li>
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  );
}

function InputButtons({ setConfirm }: { setConfirm: Dispatch<SetStateAction<boolean>> }) {
  return (
    <section className="flex flex-col gap-3">
      <button
        onClick={() => setConfirm(true)}
        className="py-3 flex gap-1 justify-center bg-sub-01 rounded-xl shadow-[0px_4px_6px_-4px_rgba(198,139,89,0.20)] shadow-[0px_10px_15px_-3px_rgba(198,139,89,0.20)]"
      >
        <img src={confirmIcon} />
        <p className="text-white text-sm font-extrabold">이대로 인증</p>
      </button>
      <button className="py-3 flex gap-1 justify-center bg-gray-04 rounded-xl">
        <img src={retryIcon} />
        <p className="text-gray-01 text-sm font-extrabold">다시 업로드</p>
      </button>
    </section>
  );
}

function Explain() {
  return (
    <section className="p-3 flex gap-3 bg-red-50 rounded-2xl border border-red-100">
      <img src={alertIcon} className="self-start" />
      <div>
        <p className="text-red-800 text-sm font-extrabold">내용이 다르게 인식되었나요?</p>
        <p className="mt-1 text-gray-01 text-xs font-normal">
          보안 및 어뷰징 방지를 위해 직접 수정할 수 없습니다.
          <br />
          결과가 다를 경우 사진을 더 선명하게
          <br />
          다시 찍어 업로드해주세요.
        </p>
        <div className="mt-3 flex gap-1.5">
          <img src={faqIcon} />
          <p className="text-gray-02 text-[10px] font-bold underline">계속해서 오류가 발생한다면? 관리자 문의</p>
        </div>
      </div>
    </section>
  );
}

function ConfirmModal() {
  return (
    <section className="fixed inset-0 bg-white/85 flex justify-center items-center">
      <div className="w-80 p-8 bg-white rounded-4xl shadow-2xl flex flex-col items-center gap-4">
        <div className="size-20 bg-main-05 rounded-full shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)] flex justify-center items-center">
          <img src={confirmModalCheckIcon} />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h3 className="text-black-01 text-xl font-extrabold">영수증 인증 완료!</h3>
          <p className="text-gray-02 text-xs font-normal">00포인트가 적립되었습니다.</p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <button className="py-3 bg-sub-01 rounded-xl text-white text-sm font-extrabold shadow-[0px_2px_4px_-2px_rgba(198,139,89,0.20)] shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)]">
            포인트 확인하기
          </button>
          <button className="py-3 bg-gray-04 rounded-xl text-gray-01 text-sm font-extrabold">닫기</button>
        </div>
      </div>
    </section>
  );
}

function TempContainer({ children }: { children: React.ReactNode }) {
  return <main className="p-4 flex flex-col gap-10">{children}</main>;
}
