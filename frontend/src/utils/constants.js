export const APP_NAME = 'DevPrep';
export const PROJECT_NAME = 'Task Manager Pro';

export const ROUTES = {
  dashboard: '/',
  login: '/login',
  register: '/register',
  topic: (slug) => `/topics/${slug}`,
  practice: (slug) => `/topics/${slug}?step=practice`,
};
