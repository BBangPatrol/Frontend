import PageHeader from "../../common/PageHeader";
import receiptIcon from "@/assets/images/receiptVerificationPage/receipt.svg";
import uploadIcon from "@/assets/images/receiptVerificationPage/upload.svg";
import cameraIcon from "@/assets/images/receiptVerificationPage/camera.svg";
import checkIcon from "@/assets/images/receiptVerificationPage/check.svg";
import crossIcon from "@/assets/images/receiptVerificationPage/cross.svg";
import AnalyzeModal from "../common/AnalyzeModal";

type MobileReceiptVerificationPageProps = {
  isAnalyzing: boolean;
  onAnalyze: () => void;
};

export default function DesktopReceiptVerificationPage({ isAnalyzing, onAnalyze }: MobileReceiptVerificationPageProps) {
  if (isAnalyzing) return <AnalyzeModal />;

  return (
    <main className="max-w-200 mx-auto p-6 flex flex-col gap-8">
      <PageHeader title="영수증 인증" icon={receiptIcon} subTitle="결제 내역과 상호명이 나온 영수증으로 빵집 방문을 인증 해보세요!" />
      <ReceiptUpload onAnalyze={onAnalyze} />
      <Explain />
    </main>
  );
}

function ReceiptUpload({ onAnalyze }: { onAnalyze: () => void }) {
  return (
    <section className="flex flex-col items-center gap-6 px-8 py-10 border-2 rounded-4xl border-dashed border-main-02">
      <div className="flex justify-center items-center">
        <img src={uploadIcon} alt="" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-gray-01 typo-head-03">영수증 촬영 또는 업로드</p>
        <p className="text-gray-02 typo-sub-01">또는 아래 버튼을 눌러 추가하세요</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <button onClick={onAnalyze} className="w-96 mx-auto py-3 bg-sub-01 shadow-[0px_10px_15px_-3px_rgba(198,139,89,0.30)] rounded-2xl text-white typo-head-05">
          파일 선택
        </button>
      </div>
    </section>
  );
}

function Explain() {
  return (
    <section className="p-6 flex flex-col gap-3 bg-yellow-01 rounded-2xl">
      <div className="flex gap-2">
        <img src={cameraIcon} />
        <h3 className="text-black-01 typo-head-04">이렇게 찍어주세요!</h3>
      </div>
      <ul className="flex flex-col gap-2">
        <li className="flex gap-1">
          <img src={checkIcon} />
          <p className="text-gray-01 typo-sub-01">매장 이름, 결제 일시, 결제 금액이 명확해야 합니다.</p>
        </li>
        <li className="flex gap-1">
          <img src={checkIcon} />
          <p className="text-gray-01 typo-sub-01">화면이나 종이가 구겨지지 않게 평평하게 해서 찍어주세요.</p>
        </li>
        <li className="flex gap-1">
          <img src={crossIcon} />
          <p className="text-gray-01 typo-sub-01">카드 번호 등 민감한 개인정보는 가리고 올려주세요.</p>
        </li>
      </ul>
    </section>
  );
}
