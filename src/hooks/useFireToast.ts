import { useToast } from "@chakra-ui/react";
import { FireToast__Interface } from "../constant/interfaces";
import useScreenWidth from "./useScreenWidth";

const useFireToast = () => {
  const toast = useToast();
  const sw = useScreenWidth();

  function fireToast({ status, title, description }: FireToast__Interface) {
    toast({
      status: status || "info",
      title: title,
      description: description,
      isClosable: true,
      position: sw < 768 ? "top" : "bottom-right",
    });
  }

  return { fireToast };
};

export default useFireToast;
