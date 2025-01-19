import { Stack, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';

import { InitialsValuesBlog, useNewBlog } from '@/components/Form/useNewBlog';
import CustomButton from '@/components/UI/Button/CustomButton';
import { IEditBlog } from '@/store/slices/blogSlice';

export const NewBlog = ({ isEditId, onClickCansel }: { isEditId: IEditBlog | null; onClickCansel: () => void }) => {
  const { initialValues, validationSchema, handleSubmit, handleEdit } = useNewBlog();
  const currentInitialValues = isEditId
    ? { ...initialValues, text: isEditId.text, media: isEditId.media }
    : initialValues;

  return (
    <Stack direction="row" spacing={2} gap={30} justifyContent={'center'}>
      <Formik
        initialValues={currentInitialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (isEditId) {
            await handleEdit(values as IEditBlog, isEditId.id);
          } else {
            await handleSubmit(values as InitialsValuesBlog);
          }
          resetForm();
          onClickCansel();
          setSubmitting(false);
        }}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
          <Form style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px', marginBottom: '20px' }}>
            <Typography>{isEditId ? 'Редактировать Блог' : 'Новый Блог'}</Typography>

            <TextField
              label={'Текст'}
              name="text"
              type="textarea"
              value={values.text}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={touched.text && Boolean(errors.text)}
              helperText={touched.text && errors.text}
            />
            <CustomButton theme="secondary" component="label">
              {'Выбрать файл'}
              <input
                type="file"
                hidden
                onChange={(e) => setFieldValue('media', e.currentTarget.files ? e.currentTarget.files[0] : null)}
              />
            </CustomButton>

            <CustomButton theme="secondary" type="submit" variant="contained" disabled={isSubmitting}>
              {'Загрузить'}
            </CustomButton>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
