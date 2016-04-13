import { getAlpha2Code } from 'i18n-iso-countries';

export function getCode(country) {
  const country_ = country.toLowerCase();

  switch (country_) {
    case 'england':
    case 'wales':
      return `_${country_}`;
    default:
      return getAlpha2Code(country_, 'en');
  }
}

export function calculateAge(dobString) {
  const dob = new Date(dobString);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const birthdayThisYear = new Date(currentYear, dob.getMonth(), dob.getDate());
  let age = currentYear - dob.getFullYear();

  if (birthdayThisYear > currentDate) {
    age--;
  }

  return age;
}

export function getLeagueByShortName(shortName, leagues) {
  return leagues.find(item =>
    item.league == shortName
  );
}

export function getLeagueById(id, leagues) {
  return leagues.find(item =>
    item.id == id
  );
}