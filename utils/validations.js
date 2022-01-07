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
  const prereqTree = MODULE_DATA[modToCheck]["prereqs"];
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

export function fulfillabilityIndex(myAcadPlan, otherAcadPlan) {
  const mySems = myAcadPlan["semesters"];
  const otherSems = otherAcadPlan["semesters"];

  const myDict = {};
  const otherDict = {};
  let myTotalMods = 0;
  for (const sem in mySems) {
    const thisSemMods = new Set();
    for (const mod in sem["modules"]) {
      thisSemMods.add(mod["moduleCode"]);
    }
    myTotalMods += thisSemMods.length;
    myDict[sem["year"] + sem["semesterNo"]/10] = thisSemMods;
  }
  for (const sem in otherSems) {
    const otherSemMods = new Set();
    for (const mod in sem["modules"]) {
      otherSemMods.add(mod["moduleCode"]);
    }
    otherDict[sem["year"] + sem["semesterNo"]/10] = otherSemMods;
  }
  const delta = otherAcadPlan["startYear"] - myAcadPlan["startYear"];
  let total = 0;

  for (const year in myDict) {
    if (otherDict.has(year + delta)) {
      let intersect = new Set([...myDict].filter(i => otherDict.has(i)));
      total += intersect.length;
    }
  }
  return total / myTotalMods;
}

export function rankByfulfillability(myAcadPlan, otherAcadPlans) {
  otherAcadPlans.sort((a, b) => fulfillabilityIndex(myAcadPlan, b) - fulfillabilityIndex(myAcadPlan, a))
  return otherAcadPlans;
}
