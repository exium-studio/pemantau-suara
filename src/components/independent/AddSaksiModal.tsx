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
import getUserData from "../../lib/getUserData";
import DisclosureHeader from "../dependent/DisclosureHeader";
import SaksiForm from "../form/SaksiForm";

export default function AddSaksiModal() {
  // States
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`add-saksi-modal`, isOpen, onOpen, onClose);
  const isSaksi = getUserData()?.role?.id === 4;

  return (
    <>
      <Tooltip
        label={!isSaksi ? "Tidak ada akses" : "Tambah Saksi"}
        openDelay={500}
        mr={9}
      >
        <IconButton
          aria-label="add-activity"
          icon={<Icon as={Plus} fontSize={iconSize} />}
          colorScheme="ap"
          className="btn-ap clicky"
          onClick={onOpen}
          isDisabled={!isSaksi}
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
            <DisclosureHeader title={"Tambah Saksi"} />
          </ModalHeader>
          <ModalBody pb={6}>
            <SaksiForm
              submitUrl={`/api/pemantau-suara/dashboard/management/aktivitas-saksi`}
              submitLabel="Tambahkan"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
