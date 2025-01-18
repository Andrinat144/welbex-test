import { Stack, Typography } from '@mui/material';
import { memo } from 'react';

import { useAppSelector } from '@/app/hooks';
import CustomButton from '@/components/UI/Button/CustomButton';
import MediaDisplay from '@/components/UI/MediaDisplay';
import { formatDateTimeFunction } from '@/helpers/formatDateTimeFunction';
import { IBlog } from '@/Interfaces/IBlog.interface';

type TProps = {
  item: IBlog;
  onClickDelete: (id: number) => void;
};

const Blog = memo(({ item, onClickDelete }: TProps) => {
  const { userInfo } = useAppSelector((state) => state.users);
  return (
    <Stack>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography>
          {item.user.name} {item.user.surname}
        </Typography>
        <Typography>{formatDateTimeFunction(item.date)}</Typography>
      </Stack>
      <Typography>{item.text ? item.text : ''}</Typography>
      {item.media && <MediaDisplay url={item.media} />}
      {userInfo && userInfo.id === item.user.id && (
        <Stack alignItems="flex-end">
          <CustomButton theme="error" onClick={() => onClickDelete(item.id)} sx={{ marginLeft: '0px' }}>
            Удалить
          </CustomButton>
        </Stack>
      )}
    </Stack>
  );
});

export default Blog;
