import {
  Avatar,
  Button,
  ButtonGroup,
  Center,
  FormControl,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import PasswordInput from "../components/dependent/input/PasswordInput";
import StringInput from "../components/dependent/input/StringInput";
import SmallLink from "../components/independent/SmallLink";
import CContainer from "../components/independent/wrapper/CContainer";
import { useLightDarkColor } from "../constant/colors";
import { responsiveSpacing } from "../constant/sizes";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { getCookie, removeCookie } from "typescript-cookie";
import getUserData from "../lib/getUserData";
import useRenderTrigger from "../hooks/useRenderTrigger";

export default function Login() {
  // SX
  const lightDarkColor = useLightDarkColor();

  const authToken = getCookie("__auth_token");
  const userData = getUserData();
  const { rt, setRt } = useRenderTrigger();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { username: "" as any, password: "" as any },
    validationSchema: yup
      .object()
      .shape({ username: "" as any, password: "" as any }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  return (
    <Center minH={"100vh"} p={responsiveSpacing} bg={"p.500"}>
      <CContainer
        maxW={"400px"}
        border={"1px solid var(--divider)"}
        borderRadius={8}
        p={responsiveSpacing}
        bg={lightDarkColor}
        position={"relative"}
      >
        <ColorModeSwitcher
          className="btn"
          size={"sm"}
          position={"absolute"}
          top={2}
          left={2}
          ml={0}
        />

        {!authToken && !userData && (
          <>
            <CContainer align={"center"} mt={4} mb={8}>
              <Text textAlign={"center"} fontSize={20} fontWeight={700} mb={2}>
                Login Mr. Y Squad
              </Text>

              <Text textAlign={"center"} opacity={0.6} maxW={"300px"}>
                Gunakan username dan password untuk masuk
              </Text>
            </CContainer>

            <form>
              <FormControl mb={4} isInvalid={!!formik.errors.username}>
                <StringInput
                  name="username"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("username", input);
                  }}
                  inputValue={formik.values.username}
                  placeholder="Username"
                  isError={!!formik.errors.username}
                />
              </FormControl>

              <FormControl mb={4} isInvalid={!!formik.errors.password}>
                <PasswordInput
                  name="password"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("password", input);
                  }}
                  inputValue={formik.values.password}
                  placeholder="Password"
                  isError={!!formik.errors.password}
                />
              </FormControl>
            </form>

            <Button colorScheme="ap" className="btn-ap clicky" mb={4}>
              Login
            </Button>

            <SmallLink to="/forgot-password" ml={"auto"}>
              Lupa password?
            </SmallLink>
          </>
        )}

        {authToken && userData && (
          <>
            <CContainer align={"center"} mt={4} mb={8}>
              <Text textAlign={"center"} fontSize={20} fontWeight={700} mb={2}>
                Login Mr. Y Squad
              </Text>

              <Text textAlign={"center"} opacity={0.6} maxW={"300px"}>
                Gunakan autentikasi yang sudah ada/login ulang
              </Text>
            </CContainer>

            <CContainer>
              <HStack
                gap={2}
                mb={4}
                borderRadius={8}
                p={responsiveSpacing}
                bg={"var(--divider)"}
              >
                <Avatar name={userData?.foto_profil} />
                <CContainer>
                  <Text fontWeight={600}>{userData?.nama}</Text>
                  <Text opacity={0.6}>{userData?.role?.name}</Text>
                </CContainer>
              </HStack>

              <ButtonGroup>
                <Button
                  w={"100%"}
                  colorScheme="ap"
                  variant={"outline"}
                  className="clicky"
                  onClick={() => {
                    removeCookie("__auth_token");
                    localStorage.removeItem("__user_data");
                    setRt(!rt);
                  }}
                >
                  Login Ulang
                </Button>
                <Button w={"100%"} colorScheme="ap" className="btn-ap clicky">
                  Klik untuk masuk
                </Button>
              </ButtonGroup>
            </CContainer>
          </>
        )}
      </CContainer>
    </Center>
  );
}
