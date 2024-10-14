import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import ActivityForm from "../form/ActivityForm";
import DisclosureHeader from "./DisclosureHeader";
import { Type__ActivityInitialValues } from "../../constant/interfaces";

interface Props {
  id: string;
  children?: any;
  initialValues?: Type__ActivityInitialValues;
}

export default function EditActivityModalDisclosure({
  id,
  children,
  initialValues,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`edit-activity-modal-${id}`, isOpen, onOpen, onClose);

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <DisclosureHeader title={"Edit Aktivitas"} />
          </ModalHeader>
          <ModalBody pb={6}>
            <ActivityForm
              initialValues={initialValues}
              excludeFields={[
                "pelaksana",
                "kelurahan",
                "rw",
                "status_aktivitas",
              ]}
              submitUrl={`/api/pemantau-suara/dashboard/management/aktivitas/${id}`}
              submitLabel="Simpan"
              method={"patch"}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
