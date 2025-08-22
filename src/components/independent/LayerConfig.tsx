import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import useLayerConfig from "../../global/useLayerConfig";
import SelectKategoriSuara from "../dependent/dedicated/SelectKategoriSuara";
import SelectLayer from "../dependent/dedicated/SelectLayer";
import DisclosureHeader from "../dependent/DisclosureHeader";
import NumberInput from "../dependent/input/NumberInput";
import FlexLine from "./FlexLine";
import CContainer from "./wrapper/CContainer";
import FloatingContainer from "./wrapper/FloatingContainer";

export default function LayerConfig() {
  const { layerConfig, onCloseLayerConfig } = useLayerConfig();
  // const { rt, setRt } = useRenderTrigger();

  // Globals
  const {
    tahun,
    setTahun,
    kategoriSuara,
    setKategoriSuara,
    layer,
    setLayer,
    opacity,
    setOpacity,
  } = useLayerConfig();

  // Formik
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      tahun: tahun,
      kategori_suara: kategoriSuara,
      layer: layer,
      opacity: opacity,
    },
    validationSchema: yup.object().shape({
      tahun: yup.number().required("Harus diisi"),
      kategori_suara: yup.object().required("Harus diisi"),
      layer: yup.object().required("Harus diisi"),
      opacity: yup.number().required("Harus diisi"),
    }),
    onSubmit: (values) => {
      if (tahun !== values.tahun) {
        setTahun(values.tahun);
      }
      if (kategoriSuara.value !== values.kategori_suara.value) {
        setKategoriSuara(values.kategori_suara);
      }
      if (layer.value !== values.layer.value) {
        setLayer(values.layer);
      }
      if (opacity !== values.opacity) {
        setOpacity(values.opacity);
      }
      // setRt(!rt);
    },
  });

  return (
    <FloatingContainer
      maxW={"264px"}
      top={"74px"}
      right={layerConfig ? "16px" : "calc(-264px + -30px)"}
      // zIndex={3}
    >
      <DisclosureHeader
        title="Layer Data Filter"
        disableBackOnClose
        onClose={onCloseLayerConfig}
        zIndex={20}
      />

      <CContainer px={5} pb={5} overflowY={"auto"} className={"scrollY"}>
        <form id="layerConfigForm" onSubmit={formik.handleSubmit}>
          <FormControl mb={4} isInvalid={!!formik.errors.tahun}>
            <FormLabel>Tahun</FormLabel>
            <NumberInput
              name="tahun"
              placeholder={`${new Date().getFullYear()}`}
              onChangeSetter={(input) => {
                formik.setFieldValue("tahun", input);
              }}
              inputValue={formik.values.tahun}
              noFormat
              isDisabled
            />
            <FormErrorMessage>{formik.errors.tahun as string}</FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!formik.errors.kategori_suara}>
            <FormLabel>Jenis Pemilihan</FormLabel>
            <SelectKategoriSuara
              name="kategori_suara"
              onConfirm={(input) => {
                formik.setFieldValue("kategori_suara", input);
              }}
              inputValue={formik.values.kategori_suara}
              // isDisabled
            />
            <FormErrorMessage>
              {formik.errors.kategori_suara as string}
            </FormErrorMessage>
          </FormControl>

          <Text opacity={0.4} fontSize={"sm"} lineHeight={1.2}>
            *Setiap kali filter diubah, data akan diperbarui
          </Text>

          <FlexLine mx={"-20px"} mt={5} mb={4} />

          <Text fontSize={[18, null, 20]} fontWeight={600} mb={4}>
            Layer Config
          </Text>

          <FormControl mb={6} isInvalid={!!formik.errors.layer}>
            <FormLabel>Layer</FormLabel>
            <SelectLayer
              name="layer"
              onConfirm={(input) => {
                formik.setFieldValue("layer", input);
              }}
              inputValue={formik.values.layer}
            />
            <FormErrorMessage>{formik.errors.layer as string}</FormErrorMessage>
          </FormControl>

          <FormControl mb={6} isInvalid={!!formik.errors.layer}>
            <FormLabel>Fill Opacity</FormLabel>
            <HStack>
              <Slider
                aria-label="slider-ex-1"
                defaultValue={formik.values.opacity}
                colorScheme="ap"
                onChange={(val) => formik.setFieldValue("opacity", val)}
                mr={2}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>

                <SliderThumb bg={"p.500"} />
              </Slider>

              <Text w={"44px"} flexShrink={0} textAlign={"right"}>
                {formik.values.opacity}%
              </Text>
            </HStack>

            <FormErrorMessage>{formik.errors.layer as string}</FormErrorMessage>
          </FormControl>
        </form>

        <Button
          type="submit"
          form="layerConfigForm"
          flexShrink={0}
          w={"100%"}
          colorScheme="ap"
          className="btn-ap clicky"
        >
          Terapkan
        </Button>
      </CContainer>
    </FloatingContainer>
  );
}
