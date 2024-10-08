import {
  Avatar,
  Box,
  BoxProps,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useBackOnClose from "../../../hooks/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import DisclosureHeader from "../../dependent/DisclosureHeader";
import useDataState from "../../../hooks/useDataState";
import CContainer from "./CContainer";
import Skeleton from "../feedback/Skeleton";
import RoleBadge from "../../dependent/RoleBadge";
import FlexLine from "../FlexLine";
import StatusAktifBadge from "../../dependent/StatusAktifBadge";
import NooflineText from "../../dependent/NooflineText";
import formatDate from "../../../lib/formatDate";
import Retry from "../feedback/Retry";

interface Props extends BoxProps {
  userId: number;
  children?: any;
}

export default function UserProfileModalDisclosure({
  userId,
  children,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`profil-modal-${userId}`, isOpen, onOpen, onClose);

  const { error, loading, data, retry } = useDataState<any>({
    url: `/api/pemantau-suara/publik-request/get-users-profile/${userId}`,
    conditions: isOpen,
    dependencies: [],
  });

  const user = data?.[0];

  // Render lateral
  const render = {
    loading: (
      <>
        <Skeleton
          w={"96px"}
          h={"96px"}
          borderRadius={"full"}
          mx={"auto"}
          mb={4}
        />
        <Skeleton h={"27px"} maxW={"300px"} mx={"auto"} mb={2} />
        <Skeleton h={"26px"} maxW={"120px"} mx={"auto"} mb={4} />
        <Skeleton h={"186px"} />
      </>
    ),
    error: (
      <>
        <Retry retry={retry} />
      </>
    ),
    empty: <></>,
    loaded: (
      <>
        <Avatar
          src={user?.foto_profil || ""}
          name={user?.nama}
          size={"xl"}
          mx={"auto"}
          mb={4}
        />
        <CContainer px={2}>
          <Text fontSize={18} fontWeight={600} textAlign={"center"} mb={2}>
            {user?.nama}
          </Text>
          <RoleBadge
            data={user?.role?.id}
            w={"fit-content"}
            mx={"auto"}
            mb={4}
          />

          {/* Biodata */}
          <CContainer gap={4}>
            <HStack>
              <Text opacity={0.6} whiteSpace={"nowrap"}>
                Status Aktif
              </Text>
              <FlexLine />
              <StatusAktifBadge data={user?.status_aktif?.id} />
            </HStack>

            <HStack>
              <Text opacity={0.6} whiteSpace={"nowrap"}>
                Penanggung Jawab
              </Text>
              <FlexLine />
              <NooflineText
                data={user?.pj_pelaksana?.nama}
                textAlign={"right"}
              />
            </HStack>

            <HStack>
              <Text opacity={0.6} whiteSpace={"nowrap"}>
                No.Telp
              </Text>
              <FlexLine />
              <Text>{user?.no_hp}</Text>
            </HStack>

            <HStack>
              <Text opacity={0.6} whiteSpace={"nowrap"}>
                Tanggal Diangkat
              </Text>
              <FlexLine />
              <Text>{formatDate(user?.tgl_diangkat)}</Text>
            </HStack>

            <HStack>
              <Text opacity={0.6} whiteSpace={"nowrap"}>
                NIK
              </Text>
              <FlexLine />
              <Text>{user?.nik_ktp}</Text>
            </HStack>
          </CContainer>
        </CContainer>
      </>
    ),
  };

  return (
    <>
      <Box cursor={"pointer"} onClick={onOpen} {...props}>
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
            <DisclosureHeader title={"Profil"} />
          </ModalHeader>
          <ModalBody>
            {loading && render.loading}
            {!loading && (
              <>
                {error && render.error}
                {!error && (
                  <>
                    {!user && render.empty}

                    {user && render.loaded}
                  </>
                )}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={backOnClose}
              w={"100%"}
              className="btn-solid clicky"
            >
              Mengerti
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
