"use client";

import { useSearchParams, useRouter } from "next/navigation";
import DefaultAuthLayout from "src/layouts/DefaultAuthLayout";
import { TextVariant, Text, Button } from "ui-components";
import { ButtonColor, ButtonSize } from "ui-components/src/button/enums";

import RegisterNewCustomer from "~features/auth/register-new-customer/RegisterNewCustomer";

const RegisterCustomerPage = () => {
  const { get } = useSearchParams();
  const isCompletedRegistration = get("success") === "true";
  const { push } = useRouter();

  return (
    <DefaultAuthLayout
      description="Create account and join millions of digital nomads around the world, living their best lifes"
      title="Create Account"
      imageUrl="https://img.freepik.com/free-photo/freelancer-girl-working-vacation-young-woman-with-laptop-works-while-sitting-sun-lounger-work-from-anywhere-freelance_1321-2242.jpg?w=1380&t=st=1693486945~exp=1693487545~hmac=90cf3b8c1610305e05b68a94f98a029cef4b5447f17266c55497773e736693f6"
    >
      {isCompletedRegistration ? (
        <div className="text-center flex flex-col space-y-5">
          <Text variant={TextVariant.HEADING1}>🎉🎉🎉</Text>
          <Text variant={TextVariant.HEADING2} customClasses="text-green-500">
            Success !
          </Text>
          <Text variant={TextVariant.BODY2}>
            We sent verification link to your email, please open your email and
            click on link, and then login.
          </Text>
          <Button
            size={ButtonSize.MEDIUM}
            onClick={() => {
              push("/login");
            }}
          >
            Login
          </Button>
          <Button
            color={ButtonColor.RED}
            onClick={() => {
              push("https://mail.google.com/mail");
            }}
            size={ButtonSize.MEDIUM}
          >
            Open Gmail
          </Button>
        </div>
      ) : (
        <RegisterNewCustomer />
      )}
    </DefaultAuthLayout>
  );
};

export default RegisterCustomerPage;
