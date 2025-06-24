import * as Yup from 'yup';

// Regular expressions for validation
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerValidation = Yup.object().shape({
    name: Yup.string()
        .required('Please enter name.')
        .min(2, 'Please enter at least 2 characters')
        .max(50, 'Name cannot exceed 20 characters'),
    email: Yup.string()
        .matches(EMAIL_REGEX, 'Please enter valid email format')
        .required('Please enter email.'),
    role: Yup.string()
        .required('Please select role.'),
    password: Yup.string()
        .matches(
            PASSWORD_REGEX,
            'Please enter password.'
        )
        .required('Please enter password.'),
    confirmPassword: Yup.string()
        .required('Please enter confirm password')
        .oneOf([Yup.ref('password')], "Passwords don't match")
});

export const loginValidation = Yup.object().shape({
    email: Yup.string()
        .matches(EMAIL_REGEX, 'Please enter valid email format.')
        .required('Please enter email.'),
    password: Yup.string()
        .matches(
            PASSWORD_REGEX,
            'Please enter password with at least 8 characters, one uppercase, one lowercase, one number and one special character.'
        )
        .required('Please enter password.')
});

export const forgetPasswordValidation = Yup.object().shape({
    email: Yup.string()
        .matches(EMAIL_REGEX, 'Please enter valid email format.')
        .required('Please enter email.'),
          password: Yup.string()
        .matches(
            PASSWORD_REGEX,
            'Please enter password with at least 8 characters, one uppercase, one lowercase, one number and one special character.'
        )
        .required('Please enter password.')
});

export const taskValidation = Yup.object().shape({
    title: Yup.string()
        .required('Please enter title.')
        .min(3, 'Please enter at least 3 characters.')
        .max(100, 'Title cannot exceed 100 characters.'),
    description: Yup.string()
        .required('Please enter description.')
        .min(10, 'Please enter at least 10 characters'),
    dueDate: Yup.string()
        .required('Please enter due date.')
        .test('future-date', 'Please select a future date', (value) => {
            return (new Date(value) > new Date())
        }),
    status: Yup.string()
        .required('Please select status.')
});

const updateProfileSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    )
});
export const adminSettingsSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current password is required')
    .min(8, 'Password must be at least 8 characters'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      PASSWORD_REGEX,
      'Password must contain uppercase, lowercase, number and special character'
    )
    .notOneOf([Yup.ref('currentPassword')], 'New password must be different from current password'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('newPassword')], "Passwords don't match")
});
export const updateProfileValidation = (isAdmin = false) => {
  return isAdmin ? adminProfileSchema : updateProfileSchema;
};