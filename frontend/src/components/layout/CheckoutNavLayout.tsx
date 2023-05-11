import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Box from "@component/Box";
import Stepper from "../Stepper";
import AppLayout from "./AppLayout";
import Navbar from "../navbar/Navbar";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import { AuthGuard } from "@component/sessions/AuthGuard";

// ======================================================
type Props = { children: ReactNode };
// ======================================================

const CheckoutNavLayout: FC<Props> = ({ children }) => {
  const [selectedStep, setSelectedStep] = useState(0);

  const router = useRouter();
  const { pathname } = router;

  const handleStepChange = (_step, ind) => {
    switch (ind) {
      case 0:
        router.push("/cart");
        break;
      case 1:
        router.push("/checkout");
        break;
      case 2:
        router.push("/orders");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setSelectedStep(1);
        break;
      case "/checkout":
        setSelectedStep(2);
        break;
      default:
        break;
    }
  }, [pathname]);

  return (
    <AuthGuard>
      <AppLayout navbar={<Navbar />}>
        <Container my="2rem">
          <Box mb="14px">
            <Grid container spacing={6}>
              <Grid item lg={8} md={8} xs={12}>
                <Stepper
                  stepperList={stepperList}
                  selectedStep={selectedStep}
                  onChange={handleStepChange}
                />
              </Grid>
            </Grid>
          </Box>
          {children}
        </Container>
      </AppLayout>
    </AuthGuard>
  );
};

const stepperList = [
  { title: "Cart", disabled: false },
  { title: "Details", disabled: false },
  { title: "Review", disabled: true },
];

export default CheckoutNavLayout;
