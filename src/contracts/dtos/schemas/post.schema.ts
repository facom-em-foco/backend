import { dateTimeRegex, isValidDate } from '@/helpers/date-helper';
import * as Yup from 'yup';

export const CreatePostSchema = Yup.object()
  .shape({
    title: Yup.string()
      .required('title is required')
      .test(
        'min-length',
        'title must be at least 5 characters',
        value => !value || value.length >= 5,
      ),
    description: Yup.string()
      .optional()
      .test(
        'min-length',
        'description must be at least 30 characters',
        value => !value || value.length >= 30,
      ),
    link: Yup.string()
      .optional()
      .test(
        'min-length',
        'link must be at least 10 characters',
        value => !value || value.length >= 10,
      ),
    imagePath: Yup.string()
      .optional()
      .test(
        'min-length',
        'imagePath must be at least 30 characters',
        value => !value || value.length >= 30,
      ),
    postDate: Yup.string()
      .required('postDate is required')
      .matches(
        dateTimeRegex,
        'postDate must be in the format YYYY-MM-DD or YYYY-MM-DD HH:mm:ss',
      )
      .test('is-valid-date', 'postDate is not a valid date', isValidDate),
    expireDate: Yup.string()
      .optional()
      .matches(
        dateTimeRegex,
        'expireDate must be in the format YYYY-MM-DD or YYYY-MM-DD HH:mm:ss',
      )
      .test('is-valid-date', 'expireDate is not a valid date', value =>
        value ? isValidDate(value) : true,
      )
      .test(
        'is-greater',
        'expireDate must be greater than or equal to postDate',
        function (value) {
          const { postDate } = this.parent;
          if (!value || !postDate) return true;

          const postDateTime = new Date(postDate);
          const expireDateTime = new Date(value);

          return expireDateTime >= postDateTime;
        },
      ),
    tags: Yup.array()
      .min(1, 'At least one tag is required')
      .required('tags are required'),
    publisherEmail: Yup.string()
      .email('invalid publisherEmail')
      .required('publisherEmail are required'),
  })
  .test(
    'at-least-one',
    'At least one of description, link, or imagePath is required',
    value => Boolean(value.description || value.link || value.imagePath),
  );

export const GetPostByIdSchema = Yup.object().shape({
  id: Yup.string().required('id is required'),
});

export const EditPostSchema = Yup.object().shape({
  id: Yup.string().required('id is required'),
  title: Yup.string()
    .optional()
    .test(
      'min-length',
      'title must be at least 5 characters',
      value => !value || value.length >= 5,
    ),
  description: Yup.string()
    .optional()
    .test(
      'min-length',
      'description must be at least 30 characters',
      value => !value || value.length >= 30,
    ),
  link: Yup.string()
    .optional()
    .test(
      'min-length',
      'link must be at least 10 characters',
      value => !value || value.length >= 10,
    ),
  imagePath: Yup.string()
    .optional()
    .test(
      'min-length',
      'imagePath must be at least 30 characters',
      value => !value || value.length >= 30,
    ),
  postDate: Yup.string()
    .optional()
    .matches(
      dateTimeRegex,
      'postDate must be in the format YYYY-MM-DD or YYYY-MM-DD HH:mm:ss',
    )
    .test('is-valid-date', 'postDate is not a valid date', value =>
      value ? isValidDate(value) : true,
    ),
  expireDate: Yup.string()
    .optional()
    .matches(
      dateTimeRegex,
      'expireDate must be in the format YYYY-MM-DD or YYYY-MM-DD HH:mm:ss',
    )
    .test('is-valid-date', 'expireDate is not a valid date', value =>
      value ? isValidDate(value) : true,
    )
    .test(
      'is-greater',
      'expireDate must be greater than or equal to postDate',
      function (value) {
        const { postDate } = this.parent;
        if (!value || !postDate) return true;

        const postDateTime = new Date(postDate);
        const expireDateTime = new Date(value);

        return expireDateTime >= postDateTime;
      },
    ),
  tags: Yup.array().optional().min(1, 'At least one tag is required'),
});
