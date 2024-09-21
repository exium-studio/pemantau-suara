import { Box, BoxProps, HStack, Text, TextProps } from "@chakra-ui/react";
import BackOnCloseButton from "../independent/BackOnCloseButton";

interface Props extends BoxProps {
  title: string;
  withoutCloseButton?: boolean;
  onClose?: () => void;
  addition?: any;
  textProps?: TextProps;
}

export default function DisclosureHeader({
  title,
  withoutCloseButton,
  onClose,
  addition,
  textProps,
  ...props
}: Props) {
  return (
    <Box pt={"18px"} pr={5} pb={6} pl={6} {...props}>
      <HStack justify={"space-between"}>
        <Text fontSize={[18, 20]} fontWeight={600} {...textProps}>
          {title}
        </Text>

        {addition}

        {!withoutCloseButton && (
          <BackOnCloseButton
            aria-label="back on close button"
            onClose={onClose}
          />
        )}
      </HStack>
    </Box>
  );
}
