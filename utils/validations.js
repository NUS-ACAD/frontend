import DEGREES from '../data/degrees';
import MAJORS from '../data/majors';
import MINORS from '../data/minors';
import MODULE_DATA from '../data/moduleData';

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

/**
 * @param {set}        myMods  List of all modules the user has taken.
 * @param {string} modToCheck  Module to check prereqs for.
 * @return {boolean} Whether prereqs are met.
 */
export function meetPrereqs(myMods, modToCheck) {
  prereqTree = MODULE_DATA[modToCheck]["prereqs"];
  function helper(tree) {
    if (typeof(tree) === "string") {
      return myMods.has(tree)
    }
    if ("or" in tree) {
      tree = tree["or"];
      for (const prereq in tree) {
        if (typeof(tree[prereq]) === "string" && myMods.has(prereq)) {
          return true;
        } else if (typeof(prereq) === "object") {
          return helper(prereq);
        }
      }
      return false;
    } else {
      tree = tree["and"];
      for (const prereq in tree) {
        if (typeof(tree[prereq] === 'string' && !(myMods.has(prereq)))) {
          return false;
        } else if (typeof(prereq) === "object") {
          if (!helper(prereq)) {
            return false;
          }
        }
      }
      return true;
    }
  }
  return helper(prereqTree)
}
