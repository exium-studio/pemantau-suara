import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { iconSize } from "../../constant/sizes";
import backOnClose from "../../lib/backOnClose";
import DisclosureHeader from "../dependent/DisclosureHeader";
import useBackOnClose from "../../hooks/useBackOnClose";
import { useFormik } from "formik";
import * as yup from "yup";
import useRequest from "../../hooks/useRequest";
import StringInput from "../dependent/input/StringInput";
import RequiredForm from "../form/RequiredForm";
import SelectGender from "../dependent/dedicated/SelectGender";

export default function AddUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`add-user-modal`, isOpen, onOpen, onClose);

  // Utils
  const { req } = useRequest();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      foto_profil: undefined as any,
      nama: "",
      jenis_kelamin: undefined as any,
      nik_ktp: "",
      tgl_diangkat: undefined as any,
      no_hp: "",
      role: undefined as any,
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({}),
    onSubmit: (values, { resetForm }) => {
      const url = `/api/pemantau-suara/dashboard/management/pengguna`;
      const payload = {
        foto_profil: values?.foto_profil,
        nama: values?.nama,
        jenis_kelamin: values?.jenis_kelamin?.value,
        nik_ktp: values?.nik_ktp,
        tgl_diangkat: values?.tgl_diangkat,
        no_hp: values?.no_hp,
        role_id: values?.role?.value,
        username: values?.username,
        password: values?.password,
      };
      const config = {
        url,
        method: "post",
        data: payload,
      };

      req({ config });
    },
  });

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
          <ModalBody>
            <form>
              {/* Nama */}
              <FormControl mb={4} isInvalid={!!formik.errors?.nama}>
                <FormLabel>
                  Nama Lengkap
                  <RequiredForm />
                </FormLabel>
                <StringInput
                  name="nama"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("nama", input);
                  }}
                  inputValue={formik.values.nama}
                  placeholder="Jolitos Kurniawan"
                />
                <FormErrorMessage>
                  {formik.errors.nama as string}
                </FormErrorMessage>
              </FormControl>

              {/* Jenis Kelamin */}
              <FormControl mb={4} isInvalid={!!formik.errors?.jenis_kelamin}>
                <FormLabel>
                  Jenis Kelamin
                  <RequiredForm />
                </FormLabel>
                <SelectGender
                  name="jenis_kelamin"
                  onConfirm={(input) => {
                    formik.setFieldValue("jenis_kelamin", input);
                  }}
                  inputValue={formik.values.jenis_kelamin}
                />
                <FormErrorMessage>
                  {formik.errors.jenis_kelamin as string}
                </FormErrorMessage>
              </FormControl>

              {/* NIK */}
              <FormControl mb={4} isInvalid={!!formik.errors?.nik_ktp}>
                <FormLabel>
                  NIK
                  <RequiredForm />
                </FormLabel>
                <StringInput
                  name="nik_ktp"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("nik_ktp", input);
                  }}
                  inputValue={formik.values.nik_ktp}
                  placeholder="jolitos.kurniawan"
                />
                <FormErrorMessage>
                  {formik.errors.nik_ktp as string}
                </FormErrorMessage>
              </FormControl>

              {/* Tanggal Diangkat */}
              <FormControl mb={4} isInvalid={!!formik.errors?.tgl_diangkat}>
                <FormLabel>
                  Tanggal Diangkat
                  <RequiredForm />
                </FormLabel>
                <StringInput
                  name="tgl_diangkat"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("tgl_diangkat", input);
                  }}
                  inputValue={formik.values.tgl_diangkat}
                  placeholder="jolitos.kurniawan"
                />
                <FormErrorMessage>
                  {formik.errors.tgl_diangkat as string}
                </FormErrorMessage>
              </FormControl>

              {/* No.Telp */}
              <FormControl mb={4} isInvalid={!!formik.errors?.no_hp}>
                <FormLabel>
                  No.Telp
                  <RequiredForm />
                </FormLabel>
                <StringInput
                  name="no_hp"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("no_hp", input);
                  }}
                  inputValue={formik.values.no_hp}
                  placeholder="jolitos.kurniawan"
                />
                <FormErrorMessage>
                  {formik.errors.no_hp as string}
                </FormErrorMessage>
              </FormControl>

              {/* Role */}
              <FormControl mb={4} isInvalid={!!formik.errors?.role}>
                <FormLabel>
                  Role/Peran/Hak Akses
                  <RequiredForm />
                </FormLabel>
                <StringInput
                  name="role"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("role", input);
                  }}
                  inputValue={formik.values.role}
                  placeholder="jolitos.kurniawan"
                />
                <FormErrorMessage>
                  {formik.errors.role as string}
                </FormErrorMessage>
              </FormControl>

              {/* Username */}
              <FormControl mb={4} isInvalid={!!formik.errors?.username}>
                <FormLabel>
                  Username
                  <RequiredForm />
                </FormLabel>
                <StringInput
                  name="username"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("username", input);
                  }}
                  inputValue={formik.values.username}
                  placeholder="jolitos.kurniawan"
                />
                <FormErrorMessage>
                  {formik.errors.username as string}
                </FormErrorMessage>
              </FormControl>

              {/* Password */}
              <FormControl mb={4} isInvalid={!!formik.errors?.password}>
                <FormLabel>
                  Password
                  <RequiredForm />
                </FormLabel>
                <StringInput
                  name="password"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("password", input);
                  }}
                  inputValue={formik.values.password}
                  placeholder="jolitos.kurniawan"
                />
                <FormErrorMessage>
                  {formik.errors.password as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button w={"100%"} colorScheme="ap" className="btn-ap clicky">
              Tambahkan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
