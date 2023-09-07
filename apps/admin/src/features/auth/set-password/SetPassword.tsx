import {
  Button,
  Form,
  Icon,
  IconSize,
  IconType,
  InputField,
  InputSize,
  Text,
  TextVariant,
} from "ui-components";
import { ButtonSize } from "ui-components/src/button/enums";

import { VALIDATION_MENU_MESSAGE_MAPPER } from "./constants";
import useSetPassword from "./useSetPassword";

const SetPasswordFeature = () => {
  const {
    form,
    onSubmit,
    loading,
    passwordHidden,
    togglePasswordHidden,
    passwordValidation,
  } = useSetPassword();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
      <div className="text-center flex flex-col">
        <Text variant={TextVariant.HEADING2}>Set password 🔒</Text>
        <Text>
          Now that you are in, set a new password different to the one we sent
          you
        </Text>
      </div>
      <div className="w-full relative">
        <Form form={form} onSubmit={onSubmit} formName="set-password-form">
          {({ control }) => (
            <div className="flex flex-col gap-7 items-center justify-center h-full">
              <InputField
                size={InputSize.NORMAL}
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
              <InputField
                size={InputSize.NORMAL}
                placeholder="Confirm password"
                fieldName="confirmPassword"
                iconType={
                  form.formState.errors.confirmPassword
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
                  fullWidth
                  loading={loading}
                  formName="set-password-form"
                  size={ButtonSize.MEDIUM}
                >
                  Change Password
                </Button>
              </div>
            </div>
          )}
        </Form>
        {passwordValidation && (
          <div className="bg-white p-3 rounded-xl absolute top-0 left-[100%] z-10 min-w-[300px] ml-5 shadow-[0px_3px_10px_0px_#00000026]">
            <ul>
              {Object.entries(passwordValidation).map((item) => (
                <li className="m-2 flex items-center gap-2" key={item[0]}>
                  <Icon
                    type={IconType.CIRCLE_CHECK_MARK}
                    size={IconSize.SMALL}
                    fill={item[1] ? "#C9CDD5" : "#10B981"}
                  />
                  <Text
                    variant={item[1] ? TextVariant.BODY1 : TextVariant.BODY2}
                  >
                    {VALIDATION_MENU_MESSAGE_MAPPER[item[0]]}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetPasswordFeature;
