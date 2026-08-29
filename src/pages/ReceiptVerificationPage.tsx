import PageHeader from "../components/common/PageHeader";
import AnalyzeModal from "../components/receipt/AnalyzeModal";
import receiptIcon from "@/assets/images/receiptVerificationPage/receipt.svg";
import uploadIcon from "@/assets/images/receiptVerificationPage/upload.svg";
import cameraIcon from "@/assets/images/receiptVerificationPage/camera.svg";
import checkIcon from "@/assets/images/receiptVerificationPage/check.svg";
import crossIcon from "@/assets/images/receiptVerificationPage/cross.svg";
import { useState, type Dispatch, type SetStateAction } from "react";

// 업로드되면 검증 페이지로 자동 이동
export default function ReceiptVerificationPage() {
  const [anaylze, setAnalyze] = useState(false);

  if (anaylze) {
    return <AnalyzeModal />;
  } else {
    return (
      <TempContainer>
        <PageHeader title="영수증 인증" icon={receiptIcon} subTitle="결제 내역과 상호명이 나온 영수증으로 빵집 방문을 인증 해보세요!" />
        <ReceiptUpload setAnalyze={setAnalyze} />
        <Explain />
      </TempContainer>
    );
  }
}

function ReceiptUpload({ setAnalyze }: { setAnalyze: Dispatch<SetStateAction<boolean>> }) {
  return (
    <section className="flex flex-col items-center gap-8 p-7 border-2 rounded-4xl border-dashed border-main-02">
      <div className="flex justify-center items-center">
        <img src={uploadIcon} alt="" />
      </div>
      <p className="text-gray-01 font-extrabold">영수증 촬영 혹은 업로드</p>
      <div className="flex flex-col gap-2 w-full">
        <button onClick={() => setAnalyze(true)} className="py-3 bg-[#C68B59] rounded-xl text-white text-sm font-extrabold">
          카메라
        </button>
        <button className="py-3 bg-white rounded-xl border border-gray-03 text-black-01 text-sm font-extrabold">파일 선택</button>
      </div>
    </section>
  );
}

function Explain() {
  return (
    <section className="p-4 flex flex-col gap-3 bg-yellow-01 rounded-2xl">
      <div className="flex gap-1">
        <img src={cameraIcon} />
        <h3 className="text-black-01 text-sm font-extrabold">이렇게 찍어주세요</h3>
      </div>
      <ul className="flex flex-col gap-2">
        <li className="flex gap-1">
          <img src={checkIcon} />
          <p className="text-gray-01 text-xs font-normal">매장 이름, 결제 일시, 결제 금액이 명확해야 합니다.</p>
        </li>
        <li className="flex gap-1">
          <img src={checkIcon} />
          <p className="text-gray-01 text-xs font-normal">화면이나 종이가 구겨지지 않게 평평하게 펴서 찍어주세요.</p>
        </li>
        <li className="flex gap-1">
          <img src={crossIcon} />
          <p className="text-gray-01 text-xs font-normal">카드 번호 등 민감한 개인정보는 가리고 올려주세요.</p>
        </li>
      </ul>
    </section>
  );
}

function TempContainer({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto p-4 flex flex-col gap-10">{children}</main>;
}
