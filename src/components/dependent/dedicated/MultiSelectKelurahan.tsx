import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Interface__SelectOption } from "../../../constant/interfaces";
import useDataState from "../../../hooks/useDataState";
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
  const [options, setOptions] = useState<any>(undefined);
  const { data } = useDataState<any>({
    url: `/api/pemantau-suara/publik-request/get-all-kelurahan`,
    conditions: isOpen,
  });

  // Fetch list item options
  useEffect(() => {
    if (isOpen && data) {
      const getOptions = data?.map((item: any) => ({
        value: item?.kode_kelurahan,
        label: item?.nama_kelurahan,
        original_data: item,
      }));

      setOptions(getOptions);
    }
  }, [isOpen, data]);

  return (
    <MultipleSelectModal
      id="multi-select-kelurahan-modal"
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
      placeholder={placeholder || "Multi Pilih Kelurahan"}
      nonNullable={nonNullable}
      {...props}
    />
  );
}
