import cameraIcon from "@/assets/images/reviewPage/camera.svg";

export default function AddImages() {
  return (
    <section>
      <button className="size-24 rounded-xl border-dashed border-2 border-gray-03 flex justify-center items-center md:size-28">
        <img src={cameraIcon} />
      </button>
    </section>
  );
}
