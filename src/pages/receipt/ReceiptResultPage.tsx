import { isAxiosError } from "axios";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import ConfirmModal from "../../components/receipt/ConfirmModal";
import ReceiptResult from "../../components/receipt/ReceiptResult";
import ReceiptResultButtons from "../../components/receipt/ReceiptResultButtons";
import ReceiptResultExplain from "../../components/receipt/ReceiptResultExplain";
import ReceiptFailureGuide from "../../components/receipt/ReceiptFailureGuide";
import { useCreateVisit } from "../../hooks/api/useCreateVisit";
import type { ReceiptAnalysisResult, StoreApiErrorResponse } from "../../api/stores";
import checkIcon from "@/assets/images/receiptResultPage/check.svg";

type ReceiptResultLocationState = {
  storeId: string;
  result: ReceiptAnalysisResult;
};

export default function ReceiptResultPage() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const createVisitMutation = useCreateVisit();
  const receiptState = location.state as ReceiptResultLocationState | null;

  if (!receiptState) return <Navigate to="/" replace />;

  const { storeId, result } = receiptState;

  const handleConfirm = () => {
    createVisitMutation.mutate(
      { storeId, totalAmount: result.amount, date: result.date, verificationToken: result.verificationToken },
      {
        onSuccess: () => setIsConfirmOpen(true),
        onError: (error) => {
          if (isAxiosError(error) && error.response?.status === 401) navigate("/", { replace: true });
        },
      },
    );
  };

  const errorMessage = isAxiosError<StoreApiErrorResponse>(createVisitMutation.error)
    ? (createVisitMutation.error.response?.data.message ?? "방문 인증에 실패했습니다.")
    : createVisitMutation.isError
      ? "방문 인증에 실패했습니다."
      : null;

  return (
    <main className="p-4 flex flex-col gap-10 md:max-w-200 md:mx-auto md:p-6 md:gap-8">
      <PageHeader title="영수증 분석 완료" icon={checkIcon} subTitle="아래 인식된 정보를 확인해주세요. 결과는 임의로 수정할 수 없습니다." />
      <ReceiptResult result={result} />
      <ReceiptResultButtons isPending={createVisitMutation.isPending} onConfirm={handleConfirm} onRetry={() => navigate(`/receipt/verify/${storeId}`, { replace: true })} />
      {errorMessage && (
        <div className="flex flex-col gap-3">
          <p className="text-center text-red typo-body-04">{errorMessage}</p>
          <ReceiptFailureGuide />
        </div>
      )}
      <ReceiptResultExplain />
      {isConfirmOpen && createVisitMutation.data && <ConfirmModal point={createVisitMutation.data.point} storeId={storeId} onClose={() => setIsConfirmOpen(false)} />}
    </main>
  );
}
