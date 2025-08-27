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

export default function SelectUser({
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
    url: `/api/pemantau-suara/publik-request/get-all-users`,
    conditions: isOpen,
  });

  // Fetch list options
  useEffect(() => {
    if (isOpen && data) {
      const getOptions = data?.map((item: any) => ({
        value: item?.id,
        label: item?.nama,
        original_data: item,
      }));

      setOptions(getOptions);
    }
  }, [isOpen, data]);

  return (
    <SingleSelectModal
      id="select-user-modal"
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
      placeholder={placeholder || "Pilih User"}
      nonNullable={nonNullable}
      {...props}
    />
  );
}
