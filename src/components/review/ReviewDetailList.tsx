import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { StoreReview } from "../../api/stores";
import type { RootState } from "../../store/store";
import Pagination from "../common/Pagination";
import Review from "./Review";
import downArrowIcon from "@/assets/images/reviewDetailPage/down_arrow.svg";
import ConfirmModal from "../../components/modal/ConfirmModal";
import { useResponsive } from "../../contexts/ResponsiveContext";
import { useDeleteReview } from "../../hooks/api/useDeleteReviews";

type ReviewDetailListProps = {
  storeId: string;
  reviews: StoreReview[];
  sort: string;
  page: number;
  totalPages: number;
  onSortChange: (sort: string) => void;
  onPageChange: (page: number) => void;
};

export default function ReviewDetailList({
  storeId,
  reviews,
  sort,
  page,
  totalPages,
  onSortChange,
  onPageChange,
}: ReviewDetailListProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReview, setselectedReview] = useState<StoreReview | null>(
    null,
  );
  const { isMobile } = useResponsive();
  const { mutate: deleteReview } = useDeleteReview();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const navigate = useNavigate();
  const sortedReviews = useMemo(() => {
    const nextReviews = [...reviews];

    if (sort === "recommended")
      return nextReviews.sort((a, b) => b.likeCount - a.likeCount);
    if (sort === "rating-desc")
      return nextReviews.sort((a, b) => b.rating - a.rating);
    if (sort === "rating-asc")
      return nextReviews.sort((a, b) => a.rating - b.rating);
    return nextReviews.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  }, [reviews, sort]);

  return (
    <section className="flex flex-col gap-8 w-full">
      <div className="flex justify-end">
        <label htmlFor="sort" className="sr-only">
          정렬 기준
        </label>
        <div className="relative">
          <select
            id="sort"
            name="sort"
            value={sort}
            className="appearance-none typo-body-03 border border-gray-04 px-3 py-2 pr-9 cursor-pointer rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] md:text-base! md:font-normal! md:leading-normal! md:shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]"
            onChange={(event) => onSortChange(event.target.value)}
          >
            <option value="latest">최신순</option>
            <option value="recommended">추천순</option>
            <option value="rating-desc">별점 높은순</option>
            <option value="rating-asc">별점 낮은순</option>
          </select>
          <img
            src={downArrowIcon}
            alt=""
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      <motion.div
        key={`${page}-${sort}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-3"
      >
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <Review
              key={review.id}
              isDetail
              storeId={storeId}
              reviewId={review.id}
              canManage={review.writerId === userId}
              onEdit={() =>
                navigate(`/detail/review/${storeId}/${review.id}/edit`, {
                  state: { review },
                })
              }
              onDelete={() => {
                setShowDeleteModal(true);
                setselectedReview(review);
              }}
              starRating={review.rating}
              userName={review.writerName}
              content={review.content}
              date={review.date}
              likeCount={review.likeCount}
              isLike={review.isLike}
              keywords={review.keywords}
              images={review.images}
              thumbnails={review.thumbnails}
            />
          ))
        ) : (
          <p className="py-8 text-center text-gray-02 typo-body-03">
            작성된 리뷰가 없습니다.
          </p>
        )}
      </motion.div>
      <Pagination
        page={page + 1}
        totalPages={totalPages}
        onPageChange={(pageNumber) => onPageChange(pageNumber - 1)}
      />
      {showDeleteModal && (
        <ConfirmModal
          isMobile={isMobile}
          title="리뷰 삭제"
          description="리뷰를 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            deleteReview({
              storeId: Number(storeId),
              reviewId: selectedReview!.id,
              page: page,
            });

            setShowDeleteModal(false);
            setselectedReview(null);
          }}
        />
      )}
    </section>
  );
}
