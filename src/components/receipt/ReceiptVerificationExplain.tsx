import cameraIcon from "@/assets/images/receiptVerificationPage/camera.svg";
import checkIcon from "@/assets/images/receiptVerificationPage/check.svg";
import crossIcon from "@/assets/images/receiptVerificationPage/cross.svg";

export default function ReceiptVerificationExplain() {
  return (
    <section className="p-4 flex flex-col gap-3 bg-yellow-01 rounded-2xl md:p-6">
      <div className="flex gap-1 md:gap-2">
        <img src={cameraIcon} />
        <h3 className="text-black-01 typo-head-05 md:text-base!">이렇게 찍어주세요!</h3>
      </div>
      <ul className="flex flex-col gap-2">
        <li className="flex gap-1">
          <img src={checkIcon} />
          <p className="text-gray-01 typo-sub-02 md:text-sm!">매장 이름, 결제 일시, 결제 금액이 명확해야 합니다.</p>
        </li>
        <li className="flex gap-1">
          <img src={checkIcon} />
          <p className="text-gray-01 typo-sub-02 md:text-sm!">화면이나 종이가 구겨지지 않게 평평하게 해서 찍어주세요.</p>
        </li>
        <li className="flex gap-1">
          <img src={crossIcon} />
          <p className="text-gray-01 typo-sub-02 md:text-sm!">카드 번호 등 민감한 개인정보는 가리고 올려주세요.</p>
        </li>
      </ul>
    </section>
  );
}
