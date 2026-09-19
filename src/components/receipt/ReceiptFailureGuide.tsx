export default function ReceiptFailureGuide() {
  return (
    <aside aria-label="영수증 인증 오류 안내" className="rounded-2xl bg-gray-04 px-4 py-3 text-gray-01 typo-body-04 md:px-5 md:py-4">
      영수증 인증 오류 시 영수증 이미지와 아이디를 메일(
      <a href="mailto:cmy397264@naver.com" className="text-sub-01 underline underline-offset-2">
        cmy397264@naver.com
      </a>
      )로 보내주세요. 확인 후 신속히 처리해 드리겠습니다.
    </aside>
  );
}
