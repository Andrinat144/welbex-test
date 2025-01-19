import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addBlog, IEditBlog, patchBlog } from '@/store/slices/blogSlice';

export interface InitialsValuesBlog {
  text: string;
  media: null | File;
}

export const useNewBlog = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.users);
  const navigate = useNavigate();
  const initialValues: InitialsValuesBlog = {
    text: '',
    media: null,
  };

  const validationSchema = Yup.object({
    text: Yup.string().required('Укажите текст'),
  });

  const handleSubmit = async (values: InitialsValuesBlog) => {
    if (userInfo) {
      dispatch(addBlog(values));
    } else {
      navigate({ pathname: '/login' });
    }
  };

  const handleEdit = async (values: IEditBlog, blogId: number) => {
    dispatch(patchBlog({ materialData: values, blogId }));
  };

  return {
    initialValues,
    validationSchema,
    handleSubmit,
    handleEdit,
  };
};
