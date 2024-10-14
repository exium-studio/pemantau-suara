import { Badge, BadgeProps } from "@chakra-ui/react";

interface Props extends BadgeProps {
  data: number;
}

export default function StatusAktivitasBadge({ data, ...restProps }: Props) {
  const props = () => {
    switch (data) {
      case 1:
        return { label: "Alat Peraga", coloShceme: "cyan" };
      case 2:
        return { label: "Sosialisasi", coloShceme: "blue" };
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
