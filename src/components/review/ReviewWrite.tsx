export default function ReviewWrite() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-3 items-end">
        <h3 className="text-black-01 typo-head-04 md:text-xl! md:leading-5.5!">한 줄 후기</h3>
        <p className="text-gray-02 typo-body-04 md:mb-px md:text-sm!">5개까지 사진 첨부 가능</p>
      </div>
      <textarea
        className="h-32 min-h-17 p-4 rounded-2xl border-2 border-gray-03 text-black-01 typo-sub-01 placeholder:text-black-02 md:h-48 md:text-lg! md:leading-5!"
        placeholder="가게에 대한 솔직한 후기를 남겨주세요."
      ></textarea>
    </section>
  );
}
