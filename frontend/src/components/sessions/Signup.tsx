import { FC, useState } from "react";
import Link from "next/link";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import CheckBox from "../CheckBox";
import TextField from "../text-field";
import { Button, IconButton } from "../buttons";
import { H3, H5, H6, SemiSpan } from "../Typography";
import { StyledSessionCard } from "./styles";
import { SignUpUser } from "@models/user.model";
import { useAuth } from "@hook/useAuth";

const Signup: FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  const handleFormSubmit = async (values) => {
    const user: SignUpUser = {
      name: values.name,
      username: values.email,
      password: values.password,
    };
    auth.register(user, () => {
      console.log("Error in sign-up-user");
    });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  return (
    <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb="0.5rem">
          Create Your Account
        </H3>

        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Please fill all forms to continued
        </H5>

        <TextField
          fullwidth
          name="name"
          mb="0.75rem"
          label="Full Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name || ""}
          placeholder="Ralph Adwards"
          errorText={touched.name && errors.name}
        />

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
          fullwidth
          mb="0.75rem"
          name="password"
          label="Password"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password || ""}
          errorText={touched.password && errors.password}
          type={passwordVisibility ? "text" : "password"}
          endAdornment={
            <IconButton
              p="0.25rem"
              mr="0.25rem"
              type="button"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
        />
        <TextField
          mb="1rem"
          fullwidth
          name="re_password"
          placeholder="*********"
          label="Confirm Password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password || ""}
          type={passwordVisibility ? "text" : "password"}
          errorText={touched.re_password && errors.re_password}
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

        <CheckBox
          mb="1.75rem"
          name="agreement"
          color="secondary"
          onChange={handleChange}
          checked={values.agreement}
          label={
            <FlexBox>
              <SemiSpan>By signing up, you agree to</SemiSpan>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                  Terms & Condtion
                </H6>
              </a>
            </FlexBox>
          }
        />

        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
        >
          Create Account
        </Button>
      </form>

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Already have account?</SemiSpan>
        <Link
          href={
            router.query?.continueUrl
              ? `/login?continueUrl=${router.query.continueUrl}`
              : "/login"
          }
        >
          <a>
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Log in
            </H6>
          </a>
        </Link>
      </FlexBox>
    </StyledSessionCard>
  );
};

const initialValues = {
  name: "",
  email: "",
  password: "",
  re_password: "",
  agreement: false,
};

const formSchema = yup.object().shape({
  name: yup.string().required("${path} is required"),
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "You have to agree with our Terms and Conditions!",
      (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!"),
});

export default Signup;
