import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { Interface__SelectOption } from "../../../constant/interfaces";
import { optionsRole } from "../../../constant/selectOptions";
import SingleSelectModal from "../input/SingleSelectModal";
import getUserData from "../../../lib/getUserData";

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

export default function SelectRole({
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

  const userRoleId = getUserData()?.role?.id;
  const fo = optionsRole.filter((option, index) => {
    if (userRoleId) {
      return index === 0;
    } else {
      return option;
    }
  });

  return (
    <SingleSelectModal
      id="select-gender-modal"
      name={name}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      options={fo}
      onConfirm={(input) => {
        onConfirm(input);
      }}
      inputValue={inputValue}
      withSearch={withSearch}
      optionsDisplay={optionsDisplay}
      isError={isError}
      placeholder={placeholder || "Pilih Role/Peran/Hak Akses"}
      nonNullable={nonNullable}
      {...props}
    />
  );
}
