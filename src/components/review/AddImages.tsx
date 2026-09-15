import { useEffect, useState, type ChangeEvent } from "react";
import cameraIcon from "@/assets/images/reviewPage/camera.svg";

type AddImagesProps = {
  images: File[];
  existingImages?: string[];
  onImagesChange: (images: File[]) => void;
};

export default function AddImages({ images, existingImages = [], onImagesChange }: AddImagesProps) {
  const imageCount = existingImages.length + images.length;
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(event.target.files ?? []);
    onImagesChange([...images, ...selectedImages].slice(0, 5 - existingImages.length));
    event.target.value = "";
  };

  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {existingImages.map((image) => (
          <div key={image} className="size-24 overflow-hidden rounded-xl border border-gray-03 md:size-28">
            <img src={image} alt="기존 리뷰 이미지" className="size-full object-cover" />
          </div>
        ))}
        {images.map((image, index) => (
          <ImagePreview key={`${image.name}-${image.lastModified}-${index}`} image={image} onRemove={() => onImagesChange(images.filter((_, imageIndex) => imageIndex !== index))} />
        ))}
        {imageCount < 5 && (
          <>
            <input id="review-images" type="file" accept="image/jpeg,image/png,image/gif,image/webp" multiple onChange={handleImageChange} className="hidden" />
            <label htmlFor="review-images" className="size-24 rounded-xl border-dashed border-2 border-gray-03 flex justify-center items-center cursor-pointer md:size-28">
              <img src={cameraIcon} alt="리뷰 이미지 추가" />
            </label>
          </>
        )}
      </div>
      <p className="text-gray-02 typo-body-04">{imageCount}/5</p>
    </section>
  );
}

function ImagePreview({ image, onRemove }: { image: File; onRemove: () => void }) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(String(reader.result));
    reader.readAsDataURL(image);
    return () => reader.abort();
  }, [image]);

  return (
    <div className="relative size-24 overflow-hidden rounded-xl border border-gray-03 md:size-28">
      {previewUrl && <img src={previewUrl} alt={image.name} className="size-full object-cover" />}
      <button type="button" aria-label={`${image.name} 삭제`} onClick={onRemove} className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white">
        ×
      </button>
    </div>
  );
}
