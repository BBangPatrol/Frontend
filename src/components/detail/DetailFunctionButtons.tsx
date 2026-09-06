import cameraIcon from "@/assets/images/detailPage/camera.svg";
import shareIcon from "@/assets/images/detailPage/share.svg";

export default function DetailFunctionButtons() {
  return (
    <div className="p-3 bg-white rounded-xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] inline-flex flex-col gap-2 md:w-full md:p-6 md:rounded-3xl md:gap-4">
      <button className="py-3 w-full bg-sub-01 rounded-xl shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)] inline-flex justify-center items-center gap-2 md:py-4 md:rounded-2xl">
        <img src={cameraIcon} />
        <p className="text-white typo-head-05 shadow-[0px_4px_6px_-1px_rgba(198,139,89,0.20)] md:text-lg! md:font-bold! md:leading-5!">로그인하고 방문 인증하기</p>
      </button>
      <button className="w-full py-3 rounded-2xl border border-offset-[-1px] border-gray-03 inline-flex justify-center items-center gap-2 md:py-4">
        <img src={shareIcon} />
        <p className="typo-head-05 text-gray-02 md:text-base! md:font-bold! md:leading-5.5!">공유</p>
      </button>
    </div>
  );
}
