import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import AnalyzeModal from "../../components/receipt/AnalyzeModal";
import ReceiptUpload from "../../components/receipt/ReceiptUpload";
import ReceiptVerificationExplain from "../../components/receipt/ReceiptVerificationExplain";
import { useResponsive } from "../../contexts/ResponsiveContext";
import receiptIcon from "@/assets/images/receiptVerificationPage/receipt.svg";

export default function ReceiptVerificationPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { isMobile } = useResponsive();

  if (isAnalyzing) return <AnalyzeModal />;

  return (
    <main className="mx-auto p-4 flex flex-col gap-10 md:max-w-200 md:p-6 md:gap-8">
      <PageHeader title="영수증 인증" icon={receiptIcon} subTitle="결제 내역과 상호명이 나온 영수증으로 빵집 방문을 인증 해보세요!" />
      <ReceiptUpload isMobile={isMobile} onAnalyze={() => setIsAnalyzing(true)} />
      <ReceiptVerificationExplain />
    </main>
  );
}
