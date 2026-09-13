export default function AddReviewButton({ isPending }: { isPending: boolean }) {
  return (
    <button type="submit" disabled={isPending} className="py-3 bg-sub-01 rounded-xl flex justify-center items-center typo-head-05 text-white disabled:opacity-50 md:py-4 md:text-lg! md:leading-5!">
      {isPending ? "등록 중..." : "등록"}
    </button>
  );
}
