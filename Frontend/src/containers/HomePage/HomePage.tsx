import { Stack } from '@mui/material';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Blog from '@/components/Blog/Blog';
import { NewBlog } from '@/components/Form/NewBlog';
import { getAllBlogs } from '@/store/slices/blogSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { allBlogs } = useAppSelector((state) => state.blog);

  console.log(allBlogs);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  return (
    <Stack gap={2}>
      {allBlogs && allBlogs.map((item) => <Blog key={item.id} item={item} />)}
      <NewBlog />
    </Stack>
  );
};

export default HomePage;
