import useScreenWidth from "./useScreenWidth";

const useIsSmScreen = () => {
  const sw = useScreenWidth();

  return sw < 768;
};

export default useIsSmScreen;
