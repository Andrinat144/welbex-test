import { Stack } from '@mui/material';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Blog from '@/components/Blog/Blog';
import { NewBlog } from '@/components/Form/NewBlog';
import { deleteBlog, getAllBlogs } from '@/store/slices/blogSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { allBlogs } = useAppSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const onClickDelete = (id: number) => {
    dispatch(deleteBlog(id));
  };

  return (
    <Stack
      gap={2}
      sx={{
        height: `calc(100vh - 80px)`,
      }}
      justifyContent={'space-between'}
    >
      <Stack gap={3}>
        {allBlogs && allBlogs.map((item) => <Blog key={item.id} item={item} onClickDelete={onClickDelete} />)}
      </Stack>
      <NewBlog />
    </Stack>
  );
};

export default HomePage;
