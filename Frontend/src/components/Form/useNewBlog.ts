import * as Yup from 'yup';

import { useAppDispatch } from '@/app/hooks';
import { addBlog } from '@/store/slices/blogSlice';

export interface InitialsValuesBlog {
  text: string;
  media: null | File;
}

export const useNewBlog = () => {
  const dispatch = useAppDispatch();
  const initialValues: InitialsValuesBlog = {
    text: '',
    media: null,
  };

  const validationSchema = Yup.object({
    text: Yup.string().required('Укажите текст'),
  });

  const handleSubmit = async (values: InitialsValuesBlog) => {
    dispatch(addBlog(values));
  };
  return {
    initialValues,
    validationSchema,
    handleSubmit,
  };
};
