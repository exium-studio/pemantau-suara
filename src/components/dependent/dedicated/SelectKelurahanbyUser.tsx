import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Interface__SelectOption } from "../../../constant/interfaces";
import useDataState from "../../../hooks/useDataState";
import SingleSelectModal from "../input/SingleSelectModal";

interface Props extends ButtonProps {
  name: string;
  onConfirm: (inputValue: Interface__SelectOption | undefined) => void;
  inputValue: Interface__SelectOption | undefined;
  withSearch?: boolean;
  optionsDisplay?: "list" | "chip";
  isError?: boolean;
  placeholder?: string;
  nonNullable?: boolean;
}

export default function SelectKelurahanbyUser({
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

  // Utils
  const { data } = useDataState<any>({
    url: `/api/pemantau-suara/publik-request/get-all-kelurahan-loggedIn`,
  });

  // Fetch list kelurahan options
  useEffect(() => {
    if (isOpen && data) {
      const getOptions = data?.map((kelurahan: any) => ({
        value: kelurahan?.kode_kelurahan,
        label: kelurahan?.nama_kelurahan,
        original_data: kelurahan,
      }));

      setOptions(getOptions);
    }
  }, [isOpen, data]);

  return (
    <SingleSelectModal
      id="select-kelurahan-by-user-modal"
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
