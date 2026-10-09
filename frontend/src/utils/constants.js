export const APP_NAME = 'DevPrep';
export const PROJECT_NAME = 'Task Manager Pro';

export const ROUTES = {
  dashboard: '/',
  login: '/login',
  register: '/register',
  topic: (slug) => `/topics/${slug}`,
  practice: (slug) => `/practice/${slug}`,
};

// Display names for the Topic `phase` values; the curriculum itself comes from GET /topics
export const PHASES = [
  { id: 'foundations', title: 'Web & JavaScript Foundations' },
  { id: 'react', title: 'React' },
  { id: 'backend', title: 'Backend & Data' },
];
