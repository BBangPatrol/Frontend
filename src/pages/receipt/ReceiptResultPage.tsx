import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import ConfirmModal from "../../components/receipt/ConfirmModal";
import ReceiptResult from "../../components/receipt/ReceiptResult";
import ReceiptResultButtons from "../../components/receipt/ReceiptResultButtons";
import ReceiptResultExplain from "../../components/receipt/ReceiptResultExplain";
import checkIcon from "@/assets/images/receiptResultPage/check.svg";

export default function ReceiptResultPage() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <main className="p-4 flex flex-col gap-10 md:max-w-200 md:mx-auto md:p-6 md:gap-8">
      <PageHeader title="영수증 분석 완료" icon={checkIcon} subTitle="아래 인식된 정보를 확인해주세요. 결과는 임의로 수정할 수 없습니다." />
      <ReceiptResult />
      <ReceiptResultButtons onConfirm={() => setIsConfirmOpen(true)} />
      <ReceiptResultExplain />
      {isConfirmOpen && <ConfirmModal onClose={() => setIsConfirmOpen(false)} />}
    </main>
  );
}
