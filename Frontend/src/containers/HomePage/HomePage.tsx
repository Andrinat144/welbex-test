import { Stack } from '@mui/material';

import Blog from '@/components/Blog/Blog';
import { NewBlog } from '@/components/Form/NewBlog';
import { useHomePage } from '@/containers/HomePage/useHomePage';

const HomePage = () => {
  const { onClickCansel, onClickEdit, onClickDelete, allBlogs, isEditId } = useHomePage();

  return (
    <Stack
      gap={2}
      sx={{
        height: `calc(100vh - 80px)`,
      }}
      justifyContent={'space-between'}
    >
      <Stack gap={3}>
        {allBlogs &&
          allBlogs.map((item, index) => (
            <Blog
              key={item.id}
              item={item}
              onClickDelete={onClickDelete}
              isEdit={index === isEditId ? true : false}
              onClickEdit={() => onClickEdit(index)}
              onClickCansel={onClickCansel}
            />
          ))}
      </Stack>
      <NewBlog isEditId={allBlogs && isEditId !== null ? allBlogs[isEditId] : null} onClickCansel={onClickCansel} />
    </Stack>
  );
};

export default HomePage;
