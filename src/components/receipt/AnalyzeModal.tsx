import receiptFullIcon from "@/assets/images/receiptVerificationPage/receipt-full.svg";
import scanIcon from "@/assets/images/receiptVerificationPage/scan.svg";
import "@/styles/scanReceipt.css";

export default function AnalyzeModal() {
  return (
    <TempContainer>
      <div className="p-8 h-full">
        <LoadingAnalyzeReceipt />
      </div>
    </TempContainer>
  );
}

function LoadingAnalyzeReceipt() {
  return (
    <section className="flex flex-col gap-6 h-full justify-center items-center">
      <div className="relative size-20">
        <img src={receiptFullIcon} alt="" className="absolute inset-0 m-auto" />
        <img src={scanIcon} alt="" className="absolute inset-0 m-auto" />
        <div className="scan-line absolute top-0 left-1/2 h-1 w-20 -translate-x-1/2 bg-sub-01 shadow-[0px_0px_8px_0px_rgba(255,107,0,0.80)]" />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h3 className="text-black-01 text-lg font-extrabold">영수증을 분석하고 있어요</h3>
        <p className="text-gray-02 text-xs font-bold">잠시만 기다려주세요...</p>
      </div>
    </section>
  );
}

function TempContainer({ children }: { children: React.ReactNode }) {
  return <main className="p-4 h-screen">{children}</main>;
}
