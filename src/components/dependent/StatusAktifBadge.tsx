import { Badge, BadgeProps } from "@chakra-ui/react";

interface Props extends BadgeProps {
  data: number;
}

export default function StatusAktifBadge({ data, ...restProps }: Props) {
  const props = () => {
    switch (data) {
      case 1:
        return { label: "Belum Aktif", coloShceme: "orange" };
      case 2:
        return { label: "Aktif", coloShceme: "green" };
      case 3:
        return { label: "Di-Non-Aktifkan", coloShceme: "red" };
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
