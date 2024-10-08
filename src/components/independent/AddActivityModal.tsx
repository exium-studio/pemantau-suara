import {
  Button,
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
import getUserData from "../../lib/getUserData";
import DisclosureHeader from "../dependent/DisclosureHeader";
import ActivityForm from "../form/ActivityForm";

export default function AddActivityModal() {
  // States
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`add-activity-modal`, isOpen, onOpen, onClose);
  const isPenggerak = getUserData()?.role?.id === 3;

  return (
    <>
      <Tooltip label="Tambah Aktivitas" openDelay={500} mr={9}>
        {!isPenggerak ? (
          <IconButton
            aria-label="add-activity"
            icon={<Icon as={Plus} fontSize={iconSize} />}
            colorScheme="ap"
            className="btn-ap clicky"
            onClick={onOpen}
          />
        ) : (
          <Button
            leftIcon={<Icon as={Plus} fontSize={iconSize} />}
            w={"100%"}
            colorScheme="ap"
            className="btn-ap clicky"
            pl={5}
            onClick={onOpen}
          >
            Tambah Aktivitas
          </Button>
        )}
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
            <ActivityForm
              submitUrl={`/api/pemantau-suara/dashboard/management/aktivitas`}
              submitLabel="Tambahkan"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
