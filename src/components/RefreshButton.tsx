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
      onClick={onClick}
      className={"rounded bg-gray-300 text-white py-2 px-3"}
    >
      <FontAwesomeIcon
        className={isAnimating ? "animate-spin-slow" : ""}
        icon={faRefresh}
      />
    </button>
  );
}
