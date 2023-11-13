import Image from "next/image";
import { Text, TextVariant, FCWithChildren } from "ui-components";

type DefaultAuthLayoutProps = {
  description: string;
  title: string;
  imageUrl: string;
};

const DefaultAuthLayout: FCWithChildren<DefaultAuthLayoutProps> = ({
  children,
  title,
  description,
  imageUrl,
}) => (
  <div className="flex w-full min-h-screen">
    <div className="w-[700px] flex flex-col justify-between items-center pb-8 py-20 px-20">
      {/* <Image
        src="/images/concorde-logo.svg"
        alt="login"
        width={200}
        height={56}
      /> */}
      <Text
        variant={TextVariant.HEADING1}
        customClasses="text-transparent bg-clip-text bg-gradient-to-br from-primary-800 to-secondary-900"
      >
        iNomad
      </Text>
      <div className="w-full">{children}</div>
      <div>
        <Text>© iNomad {new Date().getFullYear()}. All rights reserved.</Text>
      </div>
    </div>
    <div className="flex-grow flex items-center justify-center p-8 pl-0">
      <div className="h-full w-full rounded-3xl overflow-hidden relative z-50">
        <Image
          src={imageUrl}
          alt="login"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%" }}
        />
        <div className="z-10 absolute bottom-0 left-0 right-0 p-10 pr-20 flex flex-col gap-2 backdrop-blur bg-gray-900/10 ">
          <Text variant={TextVariant.HEADING1} customClasses="text-white">
            {title}
          </Text>
          <Text variant={TextVariant.HEADING4} customClasses="text-white">
            {description}
          </Text>
        </div>
      </div>
    </div>
  </div>
);

export default DefaultAuthLayout;
