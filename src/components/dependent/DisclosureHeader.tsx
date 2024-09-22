import { Box, BoxProps, HStack, Text, TextProps } from "@chakra-ui/react";
import BackOnCloseButton from "../independent/BackOnCloseButton";

interface Props extends BoxProps {
  title: string;
  withoutCloseButton?: boolean;
  onClose?: () => void;
  addition?: any;
  textProps?: TextProps;
  disableBackOnClose?: boolean;
}

export default function DisclosureHeader({
  title,
  withoutCloseButton,
  onClose,
  addition,
  textProps,
  disableBackOnClose,
  ...props
}: Props) {
  return (
    <Box p={5} pb={4} pt={"16px !important"} {...props}>
      <HStack justify={"space-between"}>
        <Text fontSize={[18, 20]} fontWeight={600} {...textProps}>
          {title}
        </Text>

        {addition}

        {!withoutCloseButton && (
          <BackOnCloseButton
            aria-label="back on close button"
            onClose={onClose}
            mr={"-4px"}
            mt={"-2px"}
            disableBackOnClose={disableBackOnClose}
          />
        )}
      </HStack>
    </Box>
  );
}
