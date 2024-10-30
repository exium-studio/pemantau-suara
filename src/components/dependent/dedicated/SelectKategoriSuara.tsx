import {
  Button,
  ButtonProps,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
} from "@chakra-ui/react";
import { RiArrowDownSLine } from "@remixicon/react";
import { Interface__SelectOption } from "../../../constant/interfaces";
import { optionsKategoriSuara } from "../../../constant/selectOptions";
import { iconSize } from "../../../constant/sizes";

interface Props extends ButtonProps {
  name: string;
  onConfirm: (inputValue: Interface__SelectOption | undefined) => void;
  inputValue: Interface__SelectOption | undefined;
  withSearch?: boolean;
  optionsDisplay?: "list" | "chip";
  isError?: boolean;
  placeholder?: string;
  nonNullable?: boolean;
  options?: Interface__SelectOption[] | undefined;
}

export default function SelectKategoriSuara({
  name,
  onConfirm,
  inputValue,
  withSearch,
  optionsDisplay = "list",
  isError,
  placeholder,
  nonNullable,
  options = optionsKategoriSuara,
  ...props
}: Props) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<Icon as={RiArrowDownSLine} fontSize={iconSize} />}
        className="btn-outline"
        w={"100%"}
        px={4}
        textAlign={"left"}
      >
        <Text className="noofline1">
          {inputValue?.label || placeholder || "Select"}
        </Text>
      </MenuButton>

      <Portal>
        <MenuList minW={"221px"} zIndex={2}>
          {options?.map((option, i) => (
            <MenuItem
              key={i}
              onClick={() => {
                onConfirm(option);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
}
