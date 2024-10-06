import { Badge, BadgeProps } from "@chakra-ui/react";

interface Props extends BadgeProps {
  data: number;
}

export default function StatusAktivitasBadge({ data, ...restProps }: Props) {
  const props = () => {
    switch (data) {
      case 1:
        return { label: "Belum Dilaksanakan", coloShceme: "red" };
      case 2:
        return { label: "Sedang Dilaksanakan", coloShceme: "orange" };
      case 3:
        return { label: "Sudah Dilaksanakan", coloShceme: "green" };
    }
  };

  return (
    <Badge
      colorScheme={props()?.coloShceme}
      borderRadius={"full"}
      textAlign={"center"}
      {...restProps}
    >
      {props()?.label}
    </Badge>
  );
}
