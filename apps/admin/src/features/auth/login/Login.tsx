import {
  Button,
  Form,
  IconType,
  InputField,
  Text,
  InputType,
  TextVariant,
} from "ui-components";
import { ButtonColor, ButtonSize } from "ui-components/src/button/enums";

import useLogin from "./use-login";

const LoginFeature = () => {
  const {
    form,
    onSubmit,
    loading,
    passwordHidden,
    togglePasswordHidden,
    redirectToForgotPassword,
  } = useLogin();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
      <div className="text-center flex flex-col">
        <Text variant={TextVariant.HEADING2}>Welcome! 👋</Text>
        <Text>Enter your account credentials to sign in</Text>
      </div>
      <div className="w-full">
        <Form form={form} onSubmit={onSubmit} formName="login-form">
          {({ control }) => (
            <div className="flex flex-col gap-6 items-center justify-center h-full">
              <InputField
                label="Email"
                fieldName="email"
                placeholder="Email"
                control={control}
                type={InputType.EMAIL}
              />
              <InputField
                label="Password"
                placeholder="Password"
                fieldName="password"
                iconType={
                  form.formState.errors.password
                    ? IconType.HIDE_EYE_RED
                    : IconType.HIDE_EYE
                }
                iconColor="white"
                control={control}
                type={passwordHidden}
                onIconClick={togglePasswordHidden}
              />
              <div className="mt-2 w-full flex-col-center gap-3">
                <Button
                  shadow
                  size={ButtonSize.MEDIUM}
                  fullWidth
                  color={ButtonColor.PRIMARY}
                  loading={loading}
                  formName="login-form"
                >
                  LOGIN
                </Button>
                <div
                  onClick={redirectToForgotPassword}
                  className="cursor-pointer mt-2"
                >
                  <Text>Forgot password?</Text>
                </div>
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default LoginFeature;
