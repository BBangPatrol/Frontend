type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isMobile?: boolean;
  type?: "brown" | "red";
};

export default function Button({
  children,
  onClick,
  className,
  isMobile,
  type = "brown",
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${className}
        ${type === "brown" ? "bg-sub-01 hover:bg-sub-02" : "bg-red hover:bg-red-600"}
        w-full
        text-white
        transition-colors
        duration-200
        hover:bg-sub-02
        rounded-xl
        ${isMobile ? "py-3 typo-head-05" : "py-4 typo-head-04"}
      `}
    >
      {children}
    </button>
  );
}
