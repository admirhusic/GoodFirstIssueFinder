import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface RefreshButtonI {
  onClick: () => void;
  isAnimating: boolean;
}

export default function RefreshButton(props: RefreshButtonI) {
  const { onClick, isAnimating } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Refresh issues"
      className="inline-flex items-center gap-2 rounded-md bg-white border border-[#d0d7de] px-3 py-1.5 text-xs font-medium text-[#24292f] hover:bg-[#f3f4f6] active:bg-[#eaeef2] transition-colors cursor-pointer"
    >
      <FontAwesomeIcon
        className={isAnimating ? "animate-spin" : ""}
        icon={faRefresh}
      />
      <span>Refresh</span>
    </button>
  );
}
