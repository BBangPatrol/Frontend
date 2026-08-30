import { useState } from "react";
import MobileReceiptResultPage from "../../components/receipt/mobile/MobileReceiptResultPage";
import { useResponsive } from "../../contexts/ResponsiveContext";
import DesktopReceiptResultPage from "../../components/receipt/desktop/DesktopReceiptResultPage";

export default function ReceiptResultPage() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { isMobile } = useResponsive();

  return isMobile ? (
    <MobileReceiptResultPage isConfirmOpen={isConfirmOpen} onConfirm={() => setIsConfirmOpen(true)} onCloseConfirm={() => setIsConfirmOpen(false)} />
  ) : (
    <DesktopReceiptResultPage isConfirmOpen={isConfirmOpen} onConfirm={() => setIsConfirmOpen(true)} onCloseConfirm={() => setIsConfirmOpen(false)} />
  );
}
