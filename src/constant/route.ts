export const ROUTE = {
  USER_ROUTE: {
    path: '/user/[userId]',
  },
  USER_LIST_ROUTE: {
    path: '/users',
  },
  SCHEDULE_ROUTE: {
    path: '/schedule',
  },
  SETTING_ROUTE: {
    path: '/settings',
  },
  SUBSCRIPTION_ROUTE: {
    path: '/subscription',
  },
};

const SETTING_BASE_PATH = `${ROUTE.SETTING_ROUTE.path}`;

export const SETTING_ROUTE = {
  NAME: {
    path: `${SETTING_BASE_PATH}/name`,
  },
  CODE: {
    path: `${SETTING_BASE_PATH}/code`,
  },
  EMAIL: {
    path: `${SETTING_BASE_PATH}/email`,
  },
  PASSWORD: {
    path: `${SETTING_BASE_PATH}/password`,
  },
};
