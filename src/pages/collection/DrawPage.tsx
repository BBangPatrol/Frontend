import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import DesktopDrawHeader from "../../components/collection/DesktopDrawHeader";
import DesktopDrawTitle from "../../components/collection/DesktopDrawTitle";
import DrawMainImage from "../../components/collection/DrawMainImage";
import DrawResult from "../../components/collection/DrawResult";
import MobileDrawHeader from "../../components/collection/MobileDrawHeader";
import { useResponsive } from "../../contexts/ResponsiveContext";
import { useDrawCollectible } from "../../hooks/api/useDrawCollectible";
import type { DrawCollectibleErrorResponse } from "../../api/collectibles";

export default function DrawPage() {
  const { isMobile } = useResponsive();
  const drawMutation = useDrawCollectible();
  const navigate = useNavigate();

  const handleDraw = () => {
    drawMutation.mutate(undefined, {
      onError: (error) => {
        if (isAxiosError(error) && error.response?.status === 401) navigate("/", { replace: true });
      },
    });
  };

  const errorMessage =
    isAxiosError<DrawCollectibleErrorResponse>(drawMutation.error) && drawMutation.error.response?.status === 400 ? drawMutation.error.response.data.message : null;

  return (
    <main className="p-4 flex flex-col gap-11 md:max-w-104 md:mx-auto md:py-6 md:px-4 md:gap-12">
      {isMobile ? <MobileDrawHeader /> : <DesktopDrawHeader />}
      <section className="flex flex-col gap-11 md:gap-13">
        <DesktopDrawTitle />
        <DrawMainImage />
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleDraw}
            disabled={drawMutation.isPending}
            className="py-3 bg-sub-01 rounded-xl shadow-[0px_10px_15px_-3px_rgba(198,139,89,0.30)] text-white typo-head-05 disabled:opacity-50 md:text-lg! md:leading-5!"
          >
            {drawMutation.isPending ? "뽑는 중..." : "100P로 뽑기"}
          </button>
          {errorMessage && <p className="text-center text-red typo-body-04">{errorMessage}</p>}
        </div>
      </section>
      {drawMutation.data && <DrawResult result={drawMutation.data} onClose={drawMutation.reset} />}
    </main>
  );
}
