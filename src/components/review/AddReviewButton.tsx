export default function AddReviewButton({ isPending, isEdit = false }: { isPending: boolean; isEdit?: boolean }) {
  return (
    <button type="submit" disabled={isPending} className="py-3 bg-sub-01 rounded-xl flex justify-center items-center typo-head-05 text-white disabled:opacity-50 md:py-4 md:text-lg! md:leading-5!">
      {isPending ? (isEdit ? "수정 중..." : "등록 중...") : isEdit ? "수정" : "등록"}
    </button>
  );
}
