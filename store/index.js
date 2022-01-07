import { action, createStore, persist } from 'easy-peasy';

const addModuleHelper = (state, payload) => {
  if (state.plan.startYear > payload.year) {
    return;
  }
  const index = state.plan.semesters.findIndex(
    (sem) => sem.year === payload.year && sem.semesterNo === payload.semesterNo,
  );
  if (index === -1) {
    const newSem = {
      year: payload.year,
      semesterNo: payload.semesterNo,
      modules: [
        {
          moduleCode: payload.moduleCode,
          moduleTitle: payload.moduleTitle,
          order: 1, // should be 1
        },
      ],
    };
    state.plan.semesters.push(newSem);
    return;
  }
  const existingSem = state.plan.semesters[index];
  const newModuleData = [
    ...existingSem.modules,
    {
      moduleCode: payload.moduleCode,
      moduleTitle: payload.moduleTitle,
      order: existingSem.modules.length + 1,
    },
  ];
  // eslint-disable-next-line no-param-reassign
  state.plan.semesters = [
    ...state.plan.semesters.filter(
      (sem) =>
        sem.year !== payload.year || sem.semesterNo !== payload.semesterNo,
    ),
    { ...existingSem, modules: newModuleData },
  ];
};

const removeModuleHelper = (state, payload) => {
  if (state.plan.startYear > payload.year) {
    return;
  }
  const index = state.plan.semesters.findIndex(
    (sem) => sem.year === payload.year && sem.semesterNo === payload.semesterNo,
  );
  if (index === -1) {
    return;
  }
  const existingSem = state.plan.semesters[index];
  const existingModule = existingSem.modules.filter(
    (m) => m.moduleCode === payload.moduleCode,
  );
  const newModuleData = existingSem.modules
    .filter((m) => m.moduleCode !== payload.moduleCode)
    .map((m) => ({
      ...m,
      order: m.order > existingModule.order ? m.order - 1 : m.order,
    }));
  // eslint-disable-next-line no-param-reassign
  state.plan.semesters = [
    ...state.plan.semesters.filter(
      (sem) =>
        sem.year !== payload.year || sem.semesterNo !== payload.semesterNo,
    ),
    { ...existingSem, modules: newModuleData },
  ];
};

const store = createStore(
  persist({
    user: null,
    setUser: action((state, payload) => {
      // eslint-disable-next-line no-param-reassign
      state.user = payload;
    }),
    plan: {
      title: '',
      description: '',
      isPrimary: false,
      startYear: 2019,
      semesters: [],
    },
    // Example payload: { year: 2019, semesterNo: 3, moduleCode: 'CS3216', moduleTitle: '...' }
    addModule: action((state, payload) => {
      addModuleHelper(state, payload);
    }),
    // Example payload: { year: 2019, semesterNo: 3, moduleCode: 'CS3216' }
    removeModule: action((state, payload) => {
      removeModuleHelper(state, payload);
    }),
    /*
    Example payload: {
      oldYear: 2019,
      oldSemesterNo: 3,
      newYear: 2019,
      newSemesterNo: 3,
      oldOrder: 1,
      newOrder: 2
      moduleTitle: '...',
      moduleCode: 'CS3216',
    }
  */
    shiftModule: action((state, payload) => {
      removeModuleHelper(state, {
        year: payload.oldYear,
        semesterNo: payload.oldSemesterNo,
        moduleCode: payload.moduleCode,
      });
      addModuleHelper(state, {
        year: payload.newYear,
        semesterNo: payload.newSemesterNo,
        moduleCode: payload.moduleCode,
        moduleTitle: payload.moduleTitle,
        order: payload.newOrder,
      });
    }),
  }),
);

export default store;
