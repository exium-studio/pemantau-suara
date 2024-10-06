import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Interface__SelectOption } from "../../../constant/interfaces";
import useGeoJSONKecamatan from "../../../global/useGeoJSONKecamatan";
import allKelurahanByGeoJSONKecamatan from "../../../lib/allKelurahanByGeoJSONKecamatan";
import MultipleSelectModal from "../input/MultipleSelectModal";

interface Props extends ButtonProps {
  name: string;
  onConfirm: (inputValue: Interface__SelectOption[] | undefined) => void;
  inputValue: Interface__SelectOption[] | undefined;
  withSearch?: boolean;
  optionsDisplay?: "list" | "chip";
  isError?: boolean;
  placeholder?: string;
  nonNullable?: boolean;
}

export default function MultiSelectKelurahan({
  name,
  onConfirm,
  inputValue,
  withSearch,
  optionsDisplay = "list",
  isError,
  placeholder,
  nonNullable,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // States
  const { geoJSONKecamatan } = useGeoJSONKecamatan();
  const [options, setOptions] = useState<any>(undefined);

  // Fetch list kelurahan options
  useEffect(() => {
    if (isOpen && geoJSONKecamatan) {
      if (isOpen && geoJSONKecamatan) {
        setOptions(allKelurahanByGeoJSONKecamatan(geoJSONKecamatan));
      }
    }
  }, [isOpen, geoJSONKecamatan]);

  return (
    <MultipleSelectModal
      id="select-kelurahan-modal"
      name={name}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      options={options}
      onConfirm={(input) => {
        onConfirm(input);
      }}
      inputValue={inputValue}
      withSearch={withSearch}
      optionsDisplay={optionsDisplay}
      isError={isError}
      placeholder={placeholder || "Pilih Kelurahan"}
      nonNullable={nonNullable}
      {...props}
    />
  );
}
