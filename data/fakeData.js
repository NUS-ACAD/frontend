export const FAKE_PLAN_BRIEF = {
  name: 'Best Plan Ever',
  description: "This is my favourite plan! Let's graduate!",
  likes: 5,
  forks: 6,
};

export const FAKE_GROUP_BRIEF = {
  name: 'Best Group Ever',
  description: "This is my favourite group! Let's graduate!",
  members: 10,
};

export const FAKE_PLAN = {
  id: 38,
  ownerId: 4,
  forkedPlanSourceId: null,
  isPrimary: true,
  startYear: 2020,
  title: 'CS major',
  description: 'easy plan',
  createdAt: '2022-01-07T19:28:06.641Z',
  updatedAt: '2022-01-07T19:28:06.641Z',
  semesters: [
    {
      id: 75,
      planId: 38,
      year: 2020,
      semesterNo: 1,
      createdAt: '2022-01-07T19:28:06.660Z',
      updatedAt: '2022-01-07T19:28:06.660Z',
      modules: [
        {
          id: 143,
          semesterId: 75,
          moduleCode: 'CS1101S',
          additionalDesc: 'easy clap',
          order: 1,
          createdAt: '2022-01-07T19:28:06.682Z',
          updatedAt: '2022-01-07T19:28:06.682Z',
          moduleTitle: 'Programming method',
        },
        {
          id: 144,
          semesterId: 75,
          moduleCode: 'CS1010S',
          additionalDesc: 'easy clap',
          order: 2,
          createdAt: '2022-01-07T19:28:06.696Z',
          updatedAt: '2022-01-07T19:28:06.696Z',
          moduleTitle: 'Programming method',
        },
      ],
    },
    {
      id: 76,
      planId: 38,
      year: 2020,
      semesterNo: 2,
      createdAt: '2022-01-07T19:28:06.712Z',
      updatedAt: '2022-01-07T19:28:06.712Z',
      modules: [
        {
          id: 145,
          semesterId: 76,
          moduleCode: 'CS1101S',
          additionalDesc: 'easy clap',
          order: 1,
          createdAt: '2022-01-07T19:28:06.736Z',
          updatedAt: '2022-01-07T19:28:06.736Z',
          moduleTitle: 'Programming method',
        },
        {
          id: 146,
          semesterId: 76,
          moduleCode: 'CS1010S',
          additionalDesc: 'easy clap',
          order: 2,
          createdAt: '2022-01-07T19:28:06.751Z',
          updatedAt: '2022-01-07T19:28:06.751Z',
          moduleTitle: 'Programming method',
        },
      ],
    },
    {
      id: 76,
      planId: 38,
      year: 2021,
      semesterNo: 4,
      createdAt: '2022-01-07T19:28:06.712Z',
      updatedAt: '2022-01-07T19:28:06.712Z',
      modules: [
        {
          id: 145,
          semesterId: 76,
          moduleCode: 'CS1101S',
          additionalDesc: 'easy clap',
          order: 1,
          createdAt: '2022-01-07T19:28:06.736Z',
          updatedAt: '2022-01-07T19:28:06.736Z',
          moduleTitle: 'Programming method',
        },
        {
          id: 146,
          semesterId: 76,
          moduleCode: 'CS1010S',
          additionalDesc: 'easy clap',
          order: 2,
          createdAt: '2022-01-07T19:28:06.751Z',
          updatedAt: '2022-01-07T19:28:06.751Z',
          moduleTitle: 'Programming method',
        },
      ],
    },
    {
      id: 76,
      planId: 38,
      year: 2021,
      semesterNo: 3,
      createdAt: '2022-01-07T19:28:06.712Z',
      updatedAt: '2022-01-07T19:28:06.712Z',
      modules: [
        {
          id: 145,
          semesterId: 76,
          moduleCode: 'CS1101S',
          additionalDesc: 'easy clap',
          order: 1,
          createdAt: '2022-01-07T19:28:06.736Z',
          updatedAt: '2022-01-07T19:28:06.736Z',
          moduleTitle: 'Programming method',
        },
        {
          id: 146,
          semesterId: 76,
          moduleCode: 'CS1010S',
          additionalDesc: 'easy clap',
          order: 2,
          createdAt: '2022-01-07T19:28:06.751Z',
          updatedAt: '2022-01-07T19:28:06.751Z',
          moduleTitle: 'Programming method',
        },
      ],
    },
  ],
};

export const FAKE_ACTIVITIES = [
  {
    id: 9,
    userId: 2,
    activityType: 'created_plan',
    planId: 40,
    secondPlanId: null,
    group_id: null,
    raw_data: null,
    created_at: '2022-01-07T21:03:15.606Z',
    updated_at: '2022-01-07T21:03:15.606Z',
  },
  {
    id: 10,
    userId: 2,
    activityType: 'created_plan',
    planId: 41,
    secondPlanId: null,
    group_id: null,
    raw_data: null,
    created_at: '2022-01-07T23:14:21.148Z',
    updated_at: '2022-01-07T23:14:21.148Z',
  },
  {
    id: 11,
    userId: 2,
    activityType: 'changed_primary_plan',
    planId: 42,
    secondPlanId: null,
    group_id: null,
    raw_data: null,
    created_at: '2022-01-07T23:15:33.358Z',
    updated_at: '2022-01-07T23:15:33.358Z',
  },
  {
    id: 12,
    userId: 2,
    activityType: 'created_plan',
    planId: 42,
    secondPlanId: null,
    group_id: null,
    raw_data: null,
    created_at: '2022-01-07T23:15:33.390Z',
    updated_at: '2022-01-07T23:15:33.390Z',
  },
  {
    id: 13,
    userId: 2,
    activityType: 'updated_plan',
    planId: 42,
    secondPlanId: null,
    group_id: null,
    raw_data: null,
    created_at: '2022-01-07T23:15:45.254Z',
    updated_at: '2022-01-07T23:15:45.254Z',
  },
  {
    id: 14,
    userId: 2,
    activityType: 'deleted_plan',
    planId: 42,
    secondPlanId: null,
    group_id: null,
    raw_data: null,
    created_at: '2022-01-07T23:16:27.491Z',
    updated_at: '2022-01-07T23:16:27.491Z',
  },
];
