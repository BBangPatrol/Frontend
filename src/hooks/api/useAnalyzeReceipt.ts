import { useMutation } from "@tanstack/react-query";
import { analyzeReceipt } from "../../api/stores";

export function useAnalyzeReceipt() {
  return useMutation({ mutationFn: analyzeReceipt });
}
