import uploadIcon from "@/assets/images/receiptVerificationPage/upload.svg";

type ReceiptUploadProps = {
  isMobile: boolean;
  onAnalyze: () => void;
};

export default function ReceiptUpload({ isMobile, onAnalyze }: ReceiptUploadProps) {
  return (
    <section className="flex flex-col items-center gap-8 p-7 border-2 rounded-4xl border-dashed border-main-02 md:gap-6 md:px-8 md:py-10">
      <div className="flex justify-center items-center">
        <img src={uploadIcon} alt="" />
      </div>
      <div className="flex flex-col items-center md:gap-2">
        <p className="text-gray-01 font-extrabold md:text-lg md:leading-5">영수증 촬영 또는 업로드</p>
        {!isMobile && <p className="text-gray-02 typo-sub-01">또는 아래 버튼을 눌러 추가하세요</p>}
      </div>
      <div className="flex flex-col gap-2 w-full">
        {isMobile ? (
          <>
            <button onClick={onAnalyze} className="py-3 bg-sub-01 rounded-xl text-white typo-head-05">
              카메라
            </button>
            <button className="py-3 bg-white rounded-xl border border-gray-03 text-black-01 typo-head-05">파일 선택</button>
          </>
        ) : (
          <button onClick={onAnalyze} className="w-96 mx-auto py-3 bg-sub-01 shadow-[0px_10px_15px_-3px_rgba(198,139,89,0.30)] rounded-2xl text-white typo-head-05">
            파일 선택
          </button>
        )}
      </div>
    </section>
  );
}
