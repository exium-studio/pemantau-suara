import {
  Center,
  Icon,
  IconButton,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
  Tooltip,
} from "@chakra-ui/react";
import { RiCloseLine, RiSearchLine } from "@remixicon/react";
import { Dispatch, useCallback, useEffect, useRef, useState } from "react";
import { iconSize } from "../../../constant/sizes";
import StringInput from "./StringInput";

interface Props extends InputGroupProps {
  name: string;
  inputValue: string;
  onChangeSetter: Dispatch<string>;
  placeholder?: string;
  tooltipLabel?: string;
  inputRef?: any;
  inputProps?: InputProps;
}

export default function SearchComponent({
  inputRef,
  name,
  inputValue,
  onChangeSetter,
  tooltipLabel,
  placeholder = "Pencarian",
  inputProps,
  ...props
}: Props) {
  // States
  const [searchLocal, setSearchLocal] = useState(inputValue);
  const [focus, setFocus] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOnChange = useCallback(
    (value: string) => {
      if (value !== inputValue) {
        onChangeSetter(value);
      }
    },
    [onChangeSetter, inputValue]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      handleOnChange(searchLocal);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchLocal, handleOnChange]);

  // Sync searchLocal with inputValue prop when it changes
  useEffect(() => {
    setSearchLocal(inputValue);
  }, [inputValue]);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setHover(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null; // Reset the timeout reference
    }
    setHover(false);
  };

  return (
    <Tooltip
      label={(!focus || hover) && (tooltipLabel || placeholder)}
      openDelay={500}
      placement="bottom-start"
    >
      <InputGroup {...props}>
        <InputLeftElement>
          <Icon as={RiSearchLine} fontSize={iconSize} />
        </InputLeftElement>

        <StringInput
          pl={10}
          name={name}
          fRef={inputRef ? inputRef : null}
          placeholder={placeholder}
          pr={"36px"}
          onChangeSetter={(input) => {
            setSearchLocal(input as string);
          }}
          inputValue={searchLocal}
          boxShadow={"none !important"}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...inputProps}
        />

        {searchLocal && (
          <Center
            flexShrink={0}
            zIndex={3}
            position={"absolute"}
            h={"100%"}
            right={2}
          >
            <IconButton
              aria-label="Clear Search"
              icon={
                <Icon as={RiCloseLine} fontSize={props.fontSize || iconSize} />
              }
              onClick={() => {
                setSearchLocal("");
              }}
              colorScheme="error"
              variant={"ghost"}
              borderRadius={"full"}
              size={"xs"}
            />
          </Center>
        )}
      </InputGroup>
    </Tooltip>
  );
}
