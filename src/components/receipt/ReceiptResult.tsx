const results = [
  ["상호명", "성심당 본점"],
  ["일자", "2026-05-23"],
  ["금액", "12,100원"],
];

export default function ReceiptResult() {
  return (
    <section>
      <dl className="flex flex-col gap-5">
        {results.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1 md:gap-3">
            <dt className="text-gray-01 typo-head-05 md:text-lg! md:leading-5!">{label}</dt>
            <dd className="px-4 py-3 bg-gray-04 rounded-xl border border-gray-03 text-black-01 typo-body-04 md:text-base! md:leading-5.5!">{value}</dd>
          </div>
        ))}
        <div className="flex flex-col gap-1 md:gap-3">
          <dt className="text-gray-01 typo-head-05 md:text-lg! md:leading-5!">메뉴</dt>
          <dd>
            <ul className="px-4 py-3 bg-gray-04 rounded-xl border border-gray-03 text-black-01 typo-body-04 md:text-base! md:leading-5.5!">
              <li>튀김소보로 2개</li>
              <li>애플파이 1개</li>
              <li>명란바게트 1개</li>
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  );
}
