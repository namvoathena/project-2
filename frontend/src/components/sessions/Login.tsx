import { FC, useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, H5, H6, SemiSpan } from "@component/Typography";
import { StyledSessionCard } from "./styles";
import { useAuth } from "@hook/useAuth";
import { SignInUser } from "@models/user.model";

const Login: FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values) => {
    const user: SignInUser = {
      username: values.email,
      password: values.password,
    };
    auth.login(user, () => {
      console.log("Error in sign-in-user!");
    });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });

  return (
    <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb="0.5rem">
          Welcome To Athena's Shop
        </H3>

        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Log in with email & password
        </H5>

        <TextField
          fullwidth
          mb="0.75rem"
          name="email"
          type="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ""}
          placeholder="exmple@mail.com"
          label="Email or Phone Number"
          errorText={touched.email && errors.email}
        />

        <TextField
          mb="1rem"
          fullwidth
          name="password"
          label="Password"
          autoComplete="on"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="*********"
          value={values.password || ""}
          errorText={touched.password && errors.password}
          type={passwordVisibility ? "text" : "password"}
          endAdornment={
            <IconButton
              p="0.25rem"
              mr="0.25rem"
              type="button"
              onClick={togglePasswordVisibility}
              color={passwordVisibility ? "gray.700" : "gray.600"}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
        />

        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
        >
          Login
        </Button>

        <FlexBox justifyContent="center" mb="1.25rem">
          <SemiSpan>Don’t have account?</SemiSpan>
          <Link
            href={
              router.query?.continueUrl
                ? `/signup?continueUrl=${router.query.continueUrl}`
                : "/signup"
            }
          >
            <a>
              <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                Sign Up
              </H6>
            </a>
          </Link>
        </FlexBox>
      </form>

      {/* <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Forgot your password?</SemiSpan>
        <Link href="/">
          <a>
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Reset It
            </H6>
          </a>
        </Link>
      </FlexBox> */}
    </StyledSessionCard>
  );
};

const initialValues = { email: "", password: "" };

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
});

export default Login;
