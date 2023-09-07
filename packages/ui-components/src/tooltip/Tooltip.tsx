import Text from "../text";

type TooltipProps = {
  text: string;
};

const Tooltip = ({ text }: TooltipProps) => (
  <div className="inline-flex p-3 justify-center items-center rounded-lg bg-secondary-800 shadow-md">
    <Text customClasses="font-medium tracking-wide" color="text-white">
      {text}
    </Text>
  </div>
);

export default Tooltip;
