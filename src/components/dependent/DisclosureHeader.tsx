import { Box, BoxProps, HStack, Text, TextProps } from "@chakra-ui/react";
import BackOnCloseButton from "../independent/BackOnCloseButton";

interface Props extends BoxProps {
  title: string;
  withoutCloseButton?: boolean;
  textProps?: TextProps;
}

export default function DisclosureHeader({
  title,
  withoutCloseButton,
  textProps,
  ...props
}: Props) {
  return (
    <Box pt={"18px"} pr={5} pb={5} pl={6} {...props}>
      <HStack justify={"space-between"} align={"start"}>
        <Text fontSize={[18, 20]} fontWeight={600} {...textProps}>
          {title}
        </Text>

        {!withoutCloseButton && (
          <BackOnCloseButton aria-label="back on close button" />
        )}
      </HStack>
    </Box>
  );
}
