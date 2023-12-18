import { COUNTRIES, Option } from "ui-components";

const getCountryFlagAndName = (countryName: string): Option | null => {
  const foundCountry = COUNTRIES.find(
    (country) => country.value === countryName
  );

  if (!foundCountry) return null;

  return {
    ...foundCountry,
    prefixImgUrl: `https://purecatamphetamine.github.io/country-flag-icons/1x1/${countryName}.svg`,
  };
};

export default getCountryFlagAndName;
