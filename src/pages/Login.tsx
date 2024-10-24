import {
  Avatar,
  Button,
  ButtonGroup,
  FormControl,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import PasswordInput from "../components/dependent/input/PasswordInput";
import StringInput from "../components/dependent/input/StringInput";
import CContainer from "../components/independent/wrapper/CContainer";
import { useLightDarkColor } from "../constant/colors";
import { responsiveSpacing } from "../constant/sizes";
import useAuth from "../hooks/useAuth";
import useRenderTrigger from "../hooks/useRenderTrigger";
import getAuthToken from "../lib/getAuthToken";
import getUserData from "../lib/getUserData";

const Logout = () => {
  // States
  const { rt, setRt } = useRenderTrigger();
  const rtRef = useRef(rt);

  // Utils
  const { logout, loading, response, status } = useAuth();

  // Handle Response
  useEffect(() => {
    if (status === 200) {
      localStorage.removeItem("__auth_token");
      localStorage.removeItem("__user_data");
      setRt(!rtRef?.current);
    }
  }, [status, response, setRt]);

  return (
    <Button
      w={"100%"}
      colorScheme="ap"
      variant={"ghost"}
      className="clicky"
      onClick={() => {
        logout({ url: `/api/logout` });
      }}
      isLoading={loading}
    >
      Login Ulang
    </Button>
  );
};

export default function Login() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // States
  const authToken = getAuthToken();
  const userData = getUserData();
  const [key, setKey] = useState(1);

  // Utils
  const navigate = useNavigate();
  const { login, loading, response, status } = useAuth();
  const { rt } = useRenderTrigger();

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

      login({ url, payload });
    },
  });

  // Handle response
  useEffect(() => {
    if (status === 200) {
      localStorage.setItem(
        "__auth_token",
        JSON.stringify(response.data?.data?.token)
      );
      localStorage.setItem(
        "__user_data",
        JSON.stringify(response.data?.data?.user)
      );
      navigate("/dashboard");
    }
  }, [status, response, navigate]);

  // Handle rerender
  useEffect(() => {
    setKey((ps) => ps + 1);
  }, [rt]);

  return (
    <Stack
      minH={"100vh"}
      align={"stretch"}
      flexDir={["column", null, "row"]}
      spacing={0}
      overflow={"auto"}
    >
      <ColorModeSwitcher
        className="btn"
        size={"sm"}
        position={"absolute"}
        top={2}
        left={2}
        zIndex={99}
      />

      <CContainer
        key={key}
        flex={"1 1 300px"}
        h={"100svh"}
        border={"1px solid var(--divider)"}
        p={8}
        bg={lightDarkColor}
        justify={"center"}
        // bg={"red"}
        position={"relative"}
      >
        <Image
          src="/asset/images/yoyokjossmark.png"
          w={"200px"}
          mx={"auto"}
          mb={8}
        />

        {(!authToken || !userData) && (
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

            <ButtonGroup>
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

            {/* <SmallLink to="/forgot-password" mx={"auto"}>
              Lupa password?
            </SmallLink> */}
          </>
        )}

        {authToken && userData && (
          <>
            <CContainer flex={0}>
              <HStack
                gap={4}
                mb={2}
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

              <Button
                w={"100%"}
                colorScheme="ap"
                className="btn-ap clicky"
                mb={2}
                as={Link}
                to={userData?.is_admin ? "/dashboard" : "/pelaksana"}
              >
                Klik untuk masuk
              </Button>

              <Logout />
            </CContainer>
          </>
        )}
      </CContainer>

      <CContainer flex={"1 0 300px"}>
        <Image src="/asset/images/yoyokjoss2.png" w={"100vw"} m={"auto"} />
      </CContainer>
    </Stack>
  );
}
