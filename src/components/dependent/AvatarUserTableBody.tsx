import { Avatar, HStack, StackProps, Text, Tooltip } from "@chakra-ui/react";
import CContainer from "../independent/wrapper/CContainer";

interface Props extends StackProps {
  data: {
    id: number;
    nama: string;
    fullName?: string;
    foto_profil: string | null;
    avatarSize?: "sm" | "md";
  };
}

export default function AvatarUserTableBody({ data, ...props }: Props) {
  return (
    <HStack w={"243px"} gap={3} {...props}>
      <Avatar
        cursor={"pointer"}
        src={data.foto_profil || ""}
        name={data.nama}
        size={data.avatarSize || "md"}
      />

      <CContainer gap={2} overflow={"hidden"}>
        <Tooltip label={data.nama} placement="right" openDelay={500}>
          <Text
            w={"fit-content"}
            maxW={"100%"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {data.fullName || data.nama}
          </Text>
        </Tooltip>
      </CContainer>
    </HStack>
  );
}
