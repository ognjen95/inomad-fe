import { IconSize, IconType } from "../icon/enums";
import Icon from "../icon/Icon";
import Text from "../text";
import { TextVariant } from "../text/enums";

type InfoProps = {
  text: string;
  textColor: string;
  iconType: IconType;
  fill?: string;
  stroke?: string;
};

const Info = ({ text, textColor, iconType, fill, stroke }: InfoProps) => (
  <div className="flex gap-2 justify-start items-center">
    <div className={textColor}>
      <Icon
        type={iconType}
        fill={fill}
        stroke={stroke}
        size={IconSize.MEDIUM}
      />
    </div>
    <div>
      <Text variant={TextVariant.BODY4} color={textColor}>
        {text}
      </Text>
    </div>
  </div>
);

export default Info;
