import { useMutation } from "@tanstack/react-query";
import { analyzeReceipt, analyzeReceiptWithoutStore } from "../../api/stores";

export function useAnalyzeReceipt(storeId?: string) {
  return useMutation({
    mutationFn: ({ receipt }: { receipt: File }) => storeId ? analyzeReceipt({ storeId, receipt }) : analyzeReceiptWithoutStore({ receipt }),
  });
}
