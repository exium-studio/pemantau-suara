import {
  Box,
  BoxProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import useBackOnClose from "../../../hooks/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import DisclosureHeader from "../../dependent/DisclosureHeader";
import UserForm from "../../form/UserForm";
import { Type__UserInitialValues } from "../../../constant/interfaces";

interface Props extends BoxProps {
  id: string;
  submitUrl: string;
  submitLabel: string;
  children?: any;
  initialValues?: Type__UserInitialValues;
  excludeFields?: string[];
}

export default function UserFormModalDisclosure({
  id,
  submitUrl,
  submitLabel,
  children,
  initialValues,
  excludeFields,
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
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <DisclosureHeader title={"Tambah Pengguna"} />
          </ModalHeader>
          <ModalBody pb={6}>
            <UserForm
              submitUrl={submitUrl}
              submitLabel={submitLabel}
              initialValues={initialValues}
              excludeFields={excludeFields}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
