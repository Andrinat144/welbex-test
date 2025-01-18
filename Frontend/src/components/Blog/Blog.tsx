import { Stack, Typography } from '@mui/material';
import { memo } from 'react';

import MediaDisplay from '@/components/UI/MediaDisplay';
import { formatDateTimeFunction } from '@/helpers/formatDateTimeFunction';
import { IBlog } from '@/Interfaces/IBlog.interface';

type TProps = {
  item: IBlog;
};

const Blog = memo(({ item }: TProps) => {
  return (
    <Stack>
      <Stack direction={'row'}>
        <Typography>
          {item.user.name} {item.user.surname}
        </Typography>
        <Typography>{formatDateTimeFunction(item.date)}</Typography>
      </Stack>
      <Typography>{item.text ? item.text : ''}</Typography>
      {item.media && <MediaDisplay url={item.media} />}
    </Stack>
  );
});

export default Blog;
