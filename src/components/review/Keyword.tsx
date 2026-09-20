type KeywordProps = {
  id: number;
  title: string;
  selected: boolean;
  onToggle: (id: number) => void;
};

export default function Keyword({ id, title, selected, onToggle }: KeywordProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onToggle(id)}
      className={`shrink-0 whitespace-nowrap px-2 py-1 rounded-[20px] border typo-body-04 md:px-3 md:py-2 md:text-sm! ${selected ? "border-sub-01 bg-sub-01 text-white" : "border-gray-03 bg-white text-gray-02"}`}
    >
      {title}
    </button>
  );
}
