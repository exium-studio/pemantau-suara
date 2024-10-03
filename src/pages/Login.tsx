import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  FormControl,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "typescript-cookie";
import * as yup from "yup";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import PasswordInput from "../components/dependent/input/PasswordInput";
import StringInput from "../components/dependent/input/StringInput";
import MapboxMapLogin from "../components/dependent/MapboxMapLogin";
import SmallLink from "../components/independent/SmallLink";
import CContainer from "../components/independent/wrapper/CContainer";
import { useLightDarkColor } from "../constant/colors";
import { responsiveSpacing } from "../constant/sizes";
import useAuth from "../hooks/useAuth";
import useRenderTrigger from "../hooks/useRenderTrigger";
import getUserData from "../lib/getUserData";

export default function Login() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // Auth
  const authToken = getCookie("__auth_token");
  const userData = getUserData();
  useEffect(() => {
    if (!authToken || !userData) {
      removeCookie("__auth_token");
      localStorage.removeItem("__user_data");
    }
  }, [authToken, userData]);

  // Utils
  const { rt, setRt } = useRenderTrigger();
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  function onSuccess() {
    navigate("/dashboard");
  }

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { username: "", password: "" },
    validationSchema: yup.object().shape({
      username: yup.string().required("Harus diisi"),
      password: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      const url = `api/login`;
      const payload = {
        username: values.username,
        password: values.password,
      };

      login({ url, payload, onSuccess });
    },
  });

  return (
    <Center minH={"100vh"} p={responsiveSpacing}>
      <ColorModeSwitcher
        className="btn"
        size={"sm"}
        position={"absolute"}
        top={2}
        left={2}
        zIndex={99}
        color={"white"}
      />

      <Box position={"fixed"} left={0} top={0}>
        <MapboxMapLogin latitude={-6.98445} longitude={110.408296} zoom={18} />
      </Box>

      <Box
        w={"100vw"}
        h={"100vh"}
        position={"fixed"}
        bg={"blackAlpha.500"}
        pointerEvents={"none"}
      />

      <CContainer
        maxW={"400px"}
        border={"1px solid var(--divider)"}
        borderRadius={8}
        p={8}
        bg={lightDarkColor}
        position={"relative"}
      >
        <Image src="/asset/logo.png" w={"80px"} mx={"auto"} />

        <CContainer align={"center"} mt={4} mb={8}>
          <Text textAlign={"center"} fontSize={20} fontWeight={700} mb={2}>
            Selamat Datang
          </Text>

          <Text textAlign={"center"} opacity={0.6} maxW={"300px"}>
            {authToken
              ? "Gunakan autentikasi yang sudah ada/login ulang"
              : "Gunakan username dan password untuk masuk"}
          </Text>
        </CContainer>

        {!authToken && !userData && (
          <>
            <form id="loginForm" onSubmit={formik.handleSubmit}>
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

            <ButtonGroup mb={4}>
              <Button
                type="submit"
                form="loginForm"
                w={"100%"}
                colorScheme="ap"
                className="btn-ap clicky"
                isLoading={loading}
              >
                Login
              </Button>
            </ButtonGroup>

            <SmallLink to="/forgot-password" mx={"auto"}>
              Lupa password?
            </SmallLink>
          </>
        )}

        {authToken && userData && (
          <>
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
