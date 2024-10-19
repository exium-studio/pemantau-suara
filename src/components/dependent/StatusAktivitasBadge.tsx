import { Badge, BadgeProps } from "@chakra-ui/react";
import { statusAktivitasColor } from "../../constant/colors";

interface Props extends BadgeProps {
  data: number;
}

export default function StatusAktivitasBadge({ data, ...restProps }: Props) {
  // SX

  const props = () => {
    switch (data) {
      case 1:
        return {
          label: "Alat Peraga",
          bg: statusAktivitasColor[1].color,
          color: "dark",
        };
      case 2:
        return {
          label: "Sosialisasi",
          bg: statusAktivitasColor[2].color,
          color: "white",
        };
    }
  };

  return (
    <Badge
      bg={props()?.bg}
      borderRadius={"full"}
      textAlign={"center"}
      color={props()?.color}
      {...restProps}
    >
      {props()?.label}
    </Badge>
  );
}
