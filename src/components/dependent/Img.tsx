import { Icon, Image, ImageProps } from "@chakra-ui/react";
import { ImageBroken } from "@phosphor-icons/react";
import { useState } from "react";

interface Props extends ImageProps {
  src?: string;
  alt?: string;
}

export default function Img({ src, alt, ...props }: Props) {
  const [error, setError] = useState<boolean>(false);

  return (
    <>
      {error && (
        <Icon as={ImageBroken} fontSize={240} color={"white"} m={"auto"} />
      )}

      {!error && (
        <Image
          src={src}
          alt={alt}
          m={"auto"}
          onError={() => {
            setError(true);
          }}
          {...props}
        />
      )}
    </>
  );
}
