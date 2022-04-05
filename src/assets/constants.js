export const TRACKERS_INFO = [
  {
    id: 0,
    title: 'Оцените свои эмоции',
    chartTitle: 'Эмоции',
    name: 'emotion',
    countPoint: 10
  },
  {
    id: 1,
    title: 'Оцените свою продуктивность',
    chartTitle: 'Продуктивность',
    name: 'production',
    countPoint: 10
  },
  {
    id: 2,
    title: 'Оцените своё самочувствие',
    chartTitle: 'Самочувствие',
    name: 'myself',
    countPoint: 10
  },
  {
    id: 3,
    title: 'Оцените своё состояние',
    chartTitle: 'Состояние',
    name: 'quality',
    countPoint: 10
  }
];

export const MODAL_TYPE = {
  TYPE_ERROR: {
    id: 0,
    className: 'error'
  },
  TYPE_WARNING: {
    id: 1,
    className: 'warning'
  },
  TYPE_INFORMATION: {
    id: 2,
    className: 'information'
  },
}

export const ACTION_TYPES = {
  LOGIN_TYPE: 0,
  JOIN_TYPE: 1,
  LOGOUT_TYPE: 2
}

export const TRACKERS_LIMIT_ON_DAY = 5;
