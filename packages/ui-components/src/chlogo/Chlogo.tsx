import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

import chLogo from "../../public/ch-logo-demo.svg";

// @TODO: remove me after the demo

const Chlogo = () => (
  <Image alt="ch logo" src={chLogo as StaticImport} width={30} height={30} />
);

export default Chlogo;
