import type { ReceiptAnalysisResult } from "../../api/stores";

export default function ReceiptResult({ result }: { result: ReceiptAnalysisResult }) {
  const results = [
    ["상호명", result.bakeryName],
    ["일자", result.date],
    ["금액", `${result.amount.toLocaleString("ko-KR")}원`],
  ];
  const menus = result.menu.split(",").map((menu) => menu.trim());

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
              {menus.map((menu) => (
                <li key={menu}>{menu}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  );
}
