import {
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { iconSize } from "../../constant/sizes";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import DisclosureHeader from "../dependent/DisclosureHeader";
import ActivityForm from "../form/ActivityForm";

export default function AddActivityModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`add-activity-modal`, isOpen, onOpen, onClose);

  return (
    <>
      <Tooltip label="Tambah Aktivitas" openDelay={500} mr={9}>
        <IconButton
          aria-label="add-activity"
          icon={<Icon as={Plus} fontSize={iconSize} />}
          colorScheme="ap"
          className="btn-ap clicky"
          onClick={onOpen}
        />
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <DisclosureHeader title={"Tambah Aktivitas"} />
          </ModalHeader>
          <ModalBody pb={6}>
            <ActivityForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
