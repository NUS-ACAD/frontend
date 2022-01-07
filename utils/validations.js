import DEGREES from '../data/degrees';
import MAJORS from '../data/majors';
import MINORS from '../data/minors';

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  return password.length >= 8;
}

export function validateName(name) {
  return name.length > 0;
}

export function validateDegree(degree, mustHave = true) {
  return (!mustHave && degree.length === 0) || DEGREES.includes(degree);
}

export function validateMajor(major) {
  return major.length === 0 || MAJORS.includes(major);
}

export function validateMinor(minor) {
  return minor.length === 0 || MINORS.includes(minor);
}

export function validateMatriculationYear(year) {
  return year && Number.parseInt(year, 10) >= 0;
}
