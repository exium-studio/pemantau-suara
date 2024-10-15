import {
  Avatar,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiLogoutBoxLine } from "@remixicon/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { iconSize } from "../../constant/sizes";
import useDetailAktivitasUser from "../../global/useDetailAktivitasUser";
import useFullscreenSpinner from "../../global/useFullscreenSpinner";
import useManageActivities from "../../global/useManageActivities";
import useManageUsers from "../../global/useManageUsers";
import useAuth from "../../hooks/useAuth";
import useBackOnClose from "../../hooks/useBackOnClose";
import useRequest from "../../hooks/useRequest";
import backOnClose from "../../lib/backOnClose";
import getUserData from "../../lib/getUserData";
import DisclosureHeader from "../dependent/DisclosureHeader";
import PasswordInput from "../dependent/input/PasswordInput";
import RoleBadge from "../dependent/RoleBadge";
import RequiredForm from "../form/RequiredForm";
import CContainer from "./wrapper/CContainer";
import FloatingContainer from "./wrapper/FloatingContainer";
import FlexLine from "./FlexLine";
import StatusAktifBadge from "../dependent/StatusAktifBadge";
import NooflineText from "../dependent/NooflineText";
import formatDate from "../../lib/formatDate";

const ChangePassword = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("change-password-modal", isOpen, onOpen, onClose);

  const { req, loading, status } = useRequest();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: yup.object().shape({
      current_password: yup.string().required("harus diisi"),
      password: yup.string().required("harus diisi"),
      password_confirmation: yup
        .string()
        .required("harus diisi")
        //@ts-ignore
        .oneOf([yup.ref("password"), null], "Password tidak cocok"), // Validasi cocok dengan password
    }),
    onSubmit: (values, { resetForm }) => {
      const payload = {
        current_password: values.current_password,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };
      const config = {
        url: "/api/pemantau-suara/dashboard/credentials/update-password-pengguna",
        data: payload,
        method: "post",
      };

      req({ config });
    },
  });

  useEffect(() => {
    if (status === 200) {
      backOnClose();
    }
  }, [status]);

  return (
    <>
      <Button w={"100%"} className="btn-solid clicky" onClick={onOpen}>
        Ubah Password
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <DisclosureHeader title={"Ubah Password"} />
          </ModalHeader>
          <ModalBody>
            <form id="changePasswordForm" onSubmit={formik.handleSubmit}>
              <FormControl mb={4} isInvalid={!!formik.errors.current_password}>
                <FormLabel>
                  Password Lama/Sekarang
                  <RequiredForm />
                </FormLabel>
                <PasswordInput
                  name="current_password"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("current_password", input);
                  }}
                  inputValue={formik.values.current_password}
                />
                <FormErrorMessage>
                  {formik.errors.current_password as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formik.errors.password}>
                <FormLabel>
                  Password Baru
                  <RequiredForm />
                </FormLabel>
                <PasswordInput
                  name="password"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("password", input);
                  }}
                  inputValue={formik.values.password}
                />
                <FormErrorMessage>
                  {formik.errors.password as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={2}
                isInvalid={!!formik.errors.password_confirmation}
              >
                <FormLabel>
                  Konfirmasi Password Baru
                  <RequiredForm />
                </FormLabel>
                <PasswordInput
                  name="password_confirmation"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("password_confirmation", input);
                  }}
                  inputValue={formik.values.password_confirmation}
                />
                <FormErrorMessage>
                  {formik.errors.password_confirmation as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form="changePasswordForm"
              w={"100%"}
              colorScheme="ap"
              className="btn-ap clicky"
              isLoading={loading}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Logout = () => {
  const { onCloseManageUsers } = useManageUsers();
  const { onCloseManageActivities } = useManageActivities();
  const { setDetailAktivitasUser } = useDetailAktivitasUser();

  // Utils
  const { onFullscreenSpinnerOpen, onFullscreenSpinnerClose } =
    useFullscreenSpinner();
  const navigate = useNavigate();
  const { logout, loading, status } = useAuth();
  function onLogout() {
    onFullscreenSpinnerOpen();
    // setLabel("Sedang keluar, harap menunggu, jangan menutup halaman ini");
    logout({ url: `/api/logout` });
  }
  // Handle response
  useEffect(() => {
    if (status === 200) {
      onFullscreenSpinnerClose();
      localStorage.removeItem("__auth_token");
      localStorage.removeItem("__user_data");
      onCloseManageUsers();
      onCloseManageActivities();
      setDetailAktivitasUser(undefined);
      navigate("/");
    }
  }, [
    status,
    navigate,
    onFullscreenSpinnerClose,
    onCloseManageUsers,
    onCloseManageActivities,
    setDetailAktivitasUser,
  ]);

  return (
    <Button
      w={"100%"}
      color={"red.400"}
      className="btn-solid clicky"
      rightIcon={
        <Icon
          as={RiLogoutBoxLine}
          transform={"rotate(180deg)"}
          fontSize={iconSize}
        />
      }
      isLoading={loading}
      onClick={onLogout}
    >
      Logout
    </Button>
  );
};

export default function Profile() {
  // States
  const userData = getUserData();
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      <Avatar
        src={userData?.foto_profil || ""}
        name={userData?.nama}
        mb={1}
        borderRadius={"full"}
        w={"46px"}
        h={"46px"}
        shadow={"sm"}
        cursor={"pointer"}
        onClick={onToggle}
      />

      <FloatingContainer
        maxW={"400px"}
        top={"74px"}
        right={isOpen ? "16px" : "calc(-400px + -16px)"}
        zIndex={4}
      >
        <DisclosureHeader
          title=""
          disableBackOnClose
          onClose={onClose}
          position={"sticky"}
          top={0}
          zIndex={20}
        />

        <CContainer px={8}>
          <HStack mt={-8} gap={4}>
            <Avatar
              src={userData?.foto_profil || ""}
              name={userData?.nama}
              size={"xl"}
              mx={"auto"}
            />
            <CContainer>
              <Text fontWeight={600} fontSize={18} mb={1}>
                {userData?.nama}
              </Text>
              <HStack>
                <RoleBadge
                  data={userData?.role?.id}
                  fontSize={10}
                  py={"2px"}
                  px={2}
                />
              </HStack>
            </CContainer>
          </HStack>

          {/* Biodata */}
          <CContainer mt={6} gap={4}>
            <HStack>
              <Text opacity={0.6} whiteSpace={"nowrap"}>
                Status Aktif
              </Text>
              <FlexLine />
              <StatusAktifBadge data={userData?.status_aktif?.id} />
            </HStack>

            <HStack>
              <Text opacity={0.6} whiteSpace={"nowrap"}>
                Penanggung Jawab
              </Text>
              <FlexLine />
              <NooflineText
                data={userData?.pj_pelaksana?.nama}
                textAlign={"right"}
              />
            </HStack>

            <HStack>
              <Text opacity={0.6} whiteSpace={"nowrap"}>
                No.Telp
              </Text>
              <FlexLine />
              <Text>{userData?.no_hp}</Text>
            </HStack>

            <HStack>
              <Text opacity={0.6} whiteSpace={"nowrap"}>
                Tanggal Diangkat
              </Text>
              <FlexLine />
              <Text>{formatDate(userData?.tgl_diangkat)}</Text>
            </HStack>

            <HStack>
              <Text opacity={0.6} whiteSpace={"nowrap"}>
                NIK
              </Text>
              <FlexLine />
              <Text>{userData?.nik_ktp}</Text>
            </HStack>
          </CContainer>
        </CContainer>

        <CContainer p={5} gap={2}>
          <ChangePassword />

          <Logout />
        </CContainer>
      </FloatingContainer>
    </>
  );
}
