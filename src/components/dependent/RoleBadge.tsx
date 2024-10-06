import { Badge, BadgeProps } from "@chakra-ui/react";

interface Props extends BadgeProps {
  data: number;
}

export default function RoleBadge({ data, ...restProps }: Props) {
  const props = () => {
    switch (data) {
      case 1:
        return { label: "Super Admin", coloShceme: "yellow" };
      case 2:
        return { label: "Penanggung Jawab", coloShceme: "purple" };
      case 3:
        return { label: "Penggerak", coloShceme: "blue" };
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
