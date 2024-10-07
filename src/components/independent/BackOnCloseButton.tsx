import { Icon, IconButton, IconButtonProps } from "@chakra-ui/react";
import { X } from "@phosphor-icons/react";
import { iconSize } from "../../constant/sizes";
import backOnClose from "../../lib/backOnClose";

interface Props extends IconButtonProps {
  disableBackOnClose?: boolean;
  onClose?: () => void;
}

export default function BackOnCloseButton({
  disableBackOnClose,
  onClose,
  ...props
}: Props) {
  return (
    <IconButton
      icon={<Icon as={X} fontSize={iconSize} className="custom-icon" />}
      minW="30px !important"
      h="30px !important"
      borderRadius={"full"}
      className="btn"
      onClick={(e) => {
        e.stopPropagation();
        !disableBackOnClose && backOnClose();
        onClose && onClose();
      }}
      {...props}
    />
  );
}
