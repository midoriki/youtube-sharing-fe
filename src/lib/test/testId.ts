export const TIRoot = {
  default: 'root-app',
};
export const TILayout = {
  header: {
    'default': 'layout-header-default',
    'homeIcon': 'layout-header-home-icon',
    'title': 'layout-header-title',
    'share': 'layout-header-share',
  },
  loginLink: {
    default: 'layout-login-link',
  },
  registerLink: {
    default: 'layout-register-link',
  },
  avatar: {
    default: 'layout-avatar',
    email: 'layout-avatar-email',
    logout: 'layout-avatar-logout',
  },
};
export const TIPages = {
  home: {
    default: 'page-home',
    perPageSelector: 'page-home-per-page-selector',
    pagination: 'page-home-pagination',
    empty: 'page-home-empty',
    refresh: 'page-home-refresh',
  },
  share: {
    default: 'page-share',
  },
};
export const TIComponents = {
  videoCard: {
    default: 'component-video-card',
    title: 'component-video-card-title',
    author: 'component-video-card-author',
    description: 'component-video-card-description',
    upvote: 'component-video-card-upvote',
    downvote: 'component-video-card-downvote',
    upvoteBtn: 'component-video-card-upvote-btn',
    downvoteBtn: 'component-video-card-downvote-btn',
  },
  pages: {
    share: {
      shareForm: {
        default: 'component-share-form-default',
        urlInput: 'component-share-form-url-input',
        submitBtn: 'component-share-form-submit-btn',
      },
    },
  },
  auth: {
    login: {
      default: 'component-auth-login',
      emailInput: 'component-auth-login-email-input',
      passwordInput: 'component-auth-login-password-input',
      submitBtn: 'component-auth-login-submit-btn',
    },
    register: {
      default: 'component-auth-register',
      emailInput: 'component-auth-register-email-input',
      passwordInput: 'component-auth-register-password-input',
      passwordConfirmationInput: 'component-auth-register-password-confirmation-input',
      submitBnt: 'component-auth-register-submit-btn',
    },
  },
};
const TestId = {
  TIRoot,
  TIPages,
  TIComponents,
  TILayout,
};
export default TestId;