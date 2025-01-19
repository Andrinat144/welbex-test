import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deleteBlog, getAllBlogs } from '@/store/slices/blogSlice';

export const useHomePage = () => {
  const dispatch = useAppDispatch();
  const { allBlogs } = useAppSelector((state) => state.blog);
  const [isEditId, setIsEditId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const onClickDelete = (id: number) => {
    dispatch(deleteBlog(id));
  };

  const onClickEdit = (id: number) => {
    setIsEditId(id);
  };

  const onClickCansel = () => {
    setIsEditId(null);
  };
  return {
    onClickCansel,
    onClickEdit,
    onClickDelete,
    allBlogs,
    isEditId,
  };
};
