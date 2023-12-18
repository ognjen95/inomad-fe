import { COUNTRIES, Option } from 'ui-components'

const getCountryFlagAndName = (countryName: string): Option | null => {
  const country = COUNTRIES.find((country) => country.value === countryName);

  if (!country) return null;

  return {
    ...country,
    prefixImgUrl: `https://purecatamphetamine.github.io/country-flag-icons/1x1/${countryName}.svg`,
  };
}

export default getCountryFlagAndName