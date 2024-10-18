import useFullscreenSpinner from "../../global/useFixedFullscreenSpinner";
import FullscreenSpinner from "./FullscreenSpinner";

export default function FixedFullscreenSpinner() {
  const { label, isOpen } = useFullscreenSpinner();

  return (
    <FullscreenSpinner
      label={label}
      position={"fixed"}
      top={0}
      left={0}
      zIndex={999999}
      visibility={isOpen ? "visible" : "hidden"}
      opacity={isOpen ? 1 : 0}
    />
  );
}
