import * as Yup from 'yup';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const CreatePostSchema = Yup.object()
  .shape({
    title: Yup.string().required('title is required'),
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
      .matches(dateRegex, 'postDate must be in the format YYYY-MM-DD'),
    expireDate: Yup.string()
      .optional()
      .matches(dateRegex, 'expireDate must be in the format YYYY-MM-DD'),
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
