import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { Interface__SelectOption } from "../../../constant/interfaces";
import MultipleSelectModal from "../input/MultipleSelectModal";
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
  options: Interface__SelectOption[] | undefined;
}

export default function SelectRW({
  name,
  onConfirm,
  inputValue,
  withSearch,
  optionsDisplay = "list",
  isError,
  placeholder,
  nonNullable,
  options,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <SingleSelectModal
      id="select-rw-modal"
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
      placeholder={placeholder || "Pilih RW"}
      nonNullable={nonNullable}
      {...props}
    />
  );
}
