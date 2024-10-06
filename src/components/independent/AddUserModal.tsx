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

export default function AddUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`add-user-modal`, isOpen, onOpen, onClose);

  return (
    <>
      <Tooltip label="Tambah Pengguna" openDelay={500} mr={9}>
        <IconButton
          aria-label="add-user"
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
            <DisclosureHeader title={"Tambah Pengguna"} />
          </ModalHeader>
          <ModalBody pb={6}>
            {/* <UserForm
              submitUrl={`/api/pemantau-suara/dashboard/management/pengguna`}
            /> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
