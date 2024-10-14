import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Stack } from "@phosphor-icons/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { iconSize } from "../../constant/sizes";
import useLayerConfig from "../../global/useLayerConfig";
import useBackOnClose from "../../hooks/useBackOnClose";
import SelectKategoriSuara from "../dependent/dedicated/SelectKategoriSuara";
import SelectLayer from "../dependent/dedicated/SelectLayer";
import DisclosureHeader from "../dependent/DisclosureHeader";
import NumberInput from "../dependent/input/NumberInput";
import RequiredForm from "../form/RequiredForm";
import CContainer from "./wrapper/CContainer";
import FloatingContainer from "./wrapper/FloatingContainer";

export default function LayerConfig() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  useBackOnClose("layer-config-modal", isOpen, onOpen, onClose);

  // Globals
  const { tahun, setTahun, kategoriSuara, setKategoriSuara, layer, setLayer } =
    useLayerConfig();

  // Formik
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      tahun: tahun,
      kategori_suara: kategoriSuara,
      layer: layer,
    },
    validationSchema: yup.object().shape({
      tahun: yup.number().required("Harus diisi"),
      kategori_suara: yup.object().required("Harus diisi"),
      layer: yup.object().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      setTahun(values.tahun);
      setKategoriSuara(values.kategori_suara);
      setLayer(values.layer);
    },
  });

  return (
    <>
      <Tooltip label={"Layer Config"} placement="bottom" mt={1} openDelay={500}>
        <IconButton
          aria-label="Layer Config"
          icon={<Icon as={Stack} fontSize={iconSize} />}
          className="btn"
          onClick={onToggle}
          color={isOpen ? "p.500" : ""}
        />
      </Tooltip>

      <FloatingContainer
        maxW={"264px"}
        top={"74px"}
        right={isOpen ? "16px" : "calc(-264px + -30px)"}
        zIndex={3}
      >
        <DisclosureHeader
          title="Layer Config"
          disableBackOnClose
          onClose={onClose}
          zIndex={20}
        />

        <CContainer px={5} pb={5} overflowY={"auto"} className={"scrollY"}>
          <form id="layerConfigForm" onSubmit={formik.handleSubmit}>
            <FormControl mb={4} isInvalid={!!formik.errors.tahun}>
              <FormLabel>
                Tahun
                <RequiredForm />
              </FormLabel>
              <NumberInput
                name="tahun"
                placeholder={`${new Date().getFullYear()}`}
                onChangeSetter={(input) => {
                  formik.setFieldValue("tahun", input);
                }}
                inputValue={formik.values.tahun}
                noFormat
              />
              <FormErrorMessage>
                {formik.errors.tahun as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={4} isInvalid={!!formik.errors.kategori_suara}>
              <FormLabel>
                Kategori Suara
                <RequiredForm />
              </FormLabel>
              <SelectKategoriSuara
                name="kategori_suara"
                onConfirm={(input) => {
                  formik.setFieldValue("kategori_suara", input);
                }}
                inputValue={formik.values.kategori_suara}
              />
              <FormErrorMessage>
                {formik.errors.kategori_suara as string}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={!!formik.errors.layer}>
              <FormLabel>
                Layer
                <RequiredForm />
              </FormLabel>
              <SelectLayer
                name="layer"
                onConfirm={(input) => {
                  formik.setFieldValue("layer", input);
                }}
                inputValue={formik.values.layer}
              />
              <FormErrorMessage>
                {formik.errors.layer as string}
              </FormErrorMessage>
            </FormControl>
          </form>

          <Button
            type="submit"
            form="layerConfigForm"
            w={"100%"}
            colorScheme="ap"
            className="btn-ap clicky"
          >
            Terapkan
          </Button>
        </CContainer>
      </FloatingContainer>

      {/* <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <DisclosureHeader title={"Layer Config"} />
          </ModalHeader>
          <ModalBody>
            <form id="layerConfigForm" onSubmit={formik.handleSubmit}>
              <FormControl mb={4} isInvalid={!!formik.errors.tahun}>
                <FormLabel>
                  Tahun
                  <RequiredForm />
                </FormLabel>
                <NumberInput
                  name="tahun"
                  placeholder={`${new Date().getFullYear()}`}
                  onChangeSetter={(input) => {
                    formik.setFieldValue("tahun", input);
                  }}
                  inputValue={formik.values.tahun}
                  noFormat
                />
                <FormErrorMessage>
                  {formik.errors.tahun as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formik.errors.kategori_suara}>
                <FormLabel>
                  Kategori Suara
                  <RequiredForm />
                </FormLabel>
                <SelectKategoriSuara
                  name="kategori_suara"
                  onConfirm={(input) => {
                    formik.setFieldValue("kategori_suara", input);
                  }}
                  inputValue={formik.values.kategori_suara}
                />
                <FormErrorMessage>
                  {formik.errors.kategori_suara as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={6} isInvalid={!!formik.errors.layer}>
                <FormLabel>
                  Layer
                  <RequiredForm />
                </FormLabel>
                <SelectLayer
                  name="layer"
                  onConfirm={(input) => {
                    formik.setFieldValue("layer", input);
                  }}
                  inputValue={formik.values.layer}
                />
                <FormErrorMessage>
                  {formik.errors.layer as string}
                </FormErrorMessage>
              </FormControl>
            </form>

            <Button w={"100%"} colorScheme="ap" className="btn-ap clicky">
              Terapkan
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </>
  );
}
