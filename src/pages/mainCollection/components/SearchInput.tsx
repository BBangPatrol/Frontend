import { useState } from "react";
import Search from "../../../assets/icon/search.svg";
import { useResponsive } from "../../../contexts/ResponsiveContext";

interface SearchInputProps {
  onSearch?: (keyword: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [keyword, setKeyword] = useState("");

  const { isMobile } = useResponsive();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch?.(keyword.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full rounded-2xl ${isMobile ? "h-10" : "gap-3 p-4 bg-white h-18.5"}`}
    >
      <div
        className={`flex items-center gap-2 w-full h-full px-3 py-2.5 bg-gray-04 rounded-2xl 
          `}
      >
        <img src={Search} alt="" className="w-5 h-5 shrink-0" />

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="빵집 이름 검색"
          className="
            w-full h-full
            bg-gray-04
            outline-none
            border-none
            typo-sub-01
            text-black-01
            placeholder:text-black-02
          "
        />
      </div>
    </form>
  );
}
