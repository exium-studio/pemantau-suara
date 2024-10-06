import { Text, TextProps, Tooltip, TooltipProps } from "@chakra-ui/react";

interface Props extends TextProps {
  data: string;
  tooltipProps?: TooltipProps;
  noofline?: number;
}

export default function NooflineText({
  data,
  tooltipProps,
  noofline,
  ...props
}: Props) {
  return (
    <Tooltip openDelay={500} label={data} placement="right" {...tooltipProps}>
      <Text
        w={"100%"}
        maxW={"243px"}
        overflow={"hidden"}
        whiteSpace={"nowrap"}
        textOverflow={"ellipsis"}
        noOfLines={noofline}
        {...props}
      >
        {data}
      </Text>
    </Tooltip>
  );
}
