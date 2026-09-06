// libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// contexts
import { useResponsive } from "../../contexts/ResponsiveContext";
// components
import OriginModal from "../../components/modal/OriginModal";

export default function HomePage() {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();

  const [isModalOpen, setIsModalOpen] = useState(true);

  const collectionImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxOo6bs1plzkiVicw5mwAEKNQbL5SODv--9yhWqYWpQEbl17bZMiM9qYg&s=10";
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
