import { isAxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import AnalyzeModal from "../../components/receipt/AnalyzeModal";
import ReceiptUpload from "../../components/receipt/ReceiptUpload";
import ReceiptVerificationExplain from "../../components/receipt/ReceiptVerificationExplain";
import { useResponsive } from "../../contexts/ResponsiveContext";
import { useAnalyzeReceipt } from "../../hooks/api/useAnalyzeReceipt";
import type { StoreApiErrorResponse } from "../../api/stores";
import receiptIcon from "@/assets/images/receiptVerificationPage/receipt.svg";

export default function ReceiptVerificationPage() {
  const { isMobile } = useResponsive();
  const { storeId } = useParams<{ storeId?: string }>();
  const analyzeMutation = useAnalyzeReceipt(storeId);
  const navigate = useNavigate();

  const handleUpload = (receipt: File) => {
    analyzeMutation.mutate(
      { receipt },
      {
        onSuccess: (result) => {
          const verifiedStoreId = storeId ?? ("storeId" in result ? String(result.storeId) : "");
          if (verifiedStoreId) navigate("/receipt/result", { state: { storeId: verifiedStoreId, result } });
        },
        onError: (error) => {
          if (isAxiosError(error) && error.response?.status === 401) navigate("/", { replace: true });
        },
      },
    );
  };

  const errorMessage = isAxiosError<StoreApiErrorResponse>(analyzeMutation.error)
    ? (analyzeMutation.error.response?.data.message ?? "영수증 분석에 실패했습니다.")
    : analyzeMutation.isError
      ? "영수증 분석에 실패했습니다."
      : null;

  if (analyzeMutation.isPending) return <AnalyzeModal />;

  return (
    <main className="mx-auto p-4 flex flex-col gap-10 md:max-w-200 md:p-6 md:gap-8">
      <PageHeader title="영수증 인증" icon={receiptIcon} subTitle="결제 내역과 상호명이 나온 영수증으로 빵집 방문을 인증 해보세요!" />
      <ReceiptUpload isMobile={isMobile} errorMessage={errorMessage} onUpload={handleUpload} />
      <ReceiptVerificationExplain />
    </main>
  );
}
