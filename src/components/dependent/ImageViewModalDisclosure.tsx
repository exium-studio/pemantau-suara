import {
  Box,
  BoxProps,
  ImageProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import Img from "./Img";
import DisclosureHeader from "./DisclosureHeader";

interface Props extends BoxProps {
  id: string;
  src: string;
  alt?: string;
  children?: any;
  imageProps?: ImageProps;
}

export default function ImageViewModalDisclosure({
  id,
  src,
  alt,
  children,
  imageProps,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(id, isOpen, onOpen, onClose);

  return (
    <>
      <Box onClick={onOpen} {...props}>
        {children}
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        blockScrollOnMount={false}
        size={"full"}
      >
        <ModalOverlay bg={"blackAlpha.500"} />
        <ModalContent
          bg={"transparent"}
          minH={"calc(100vh - 32px)"}
          border={"none"}
          onClick={backOnClose}
        >
          <ModalHeader>
            <DisclosureHeader
              iconButtonProps={{
                "aria-label": "back on close button",
                color: "white",
              }}
            />
          </ModalHeader>
          <ModalBody>
            <Img src={src} alt={alt} {...imageProps} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
