import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {}

export default function VDivider({ ...props }: Props) {
  return (
    <Box
      bg={"var(--divider)"}
      w={"2px"}
      borderRadius={"full"}
      flexShrink={0}
      {...props}
    />
  );
}
