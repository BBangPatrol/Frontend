import { useState } from "react";
import MobileReceiptVerificationPage from "../../components/receipt/mobile/MobileReceiptVerificationPage";
import { useResponsive } from "../../contexts/ResponsiveContext";
import DesktopReceiptVerificationPage from "../../components/receipt/desktop/DesktopReceiptVerificationPage";

export default function ReceiptVerificationPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { isMobile } = useResponsive();

  return isMobile ? (
    <MobileReceiptVerificationPage isAnalyzing={isAnalyzing} onAnalyze={() => setIsAnalyzing(true)} />
  ) : (
    <DesktopReceiptVerificationPage isAnalyzing={isAnalyzing} onAnalyze={() => setIsAnalyzing(true)} />
  );
}
