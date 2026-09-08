// contexts
import { useResponsive } from "../../contexts/ResponsiveContext";

export default function HomePage() {
  const { isMobile } = useResponsive();
  return (
    <div>
      <h1>Home</h1>

      <p>
        현재 화면:
        {isMobile ? " Mobile" : " Desktop"}
      </p>
    </div>
  );
}
