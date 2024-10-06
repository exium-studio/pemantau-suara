import { Spinner, StackProps, VStack } from "@chakra-ui/react";

interface Props extends StackProps {}

export default function ComponentSpinner({ ...props }: Props) {
  return (
    <VStack minH={"100px"} justify={"center"} {...props}>
      <Spinner />
    </VStack>
  );
}
