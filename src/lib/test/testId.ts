export const TIRoot = {
  default: 'root-app',
};
export const TILayout = {
  loginLink: {
    default: 'layout-login-link',
  },
  registerLink: {
    default: 'layout-register-link',
  },
};
export const TIPages = {
  home: {
    default: 'page-home',
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
      submitBnt: 'component-auth-login-submit-btn',
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