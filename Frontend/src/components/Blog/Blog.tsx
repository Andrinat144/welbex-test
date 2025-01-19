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
  isEdit: boolean;
  onClickEdit: () => void;
  onClickCansel: () => void;
};

const Blog = memo(({ item, onClickDelete, isEdit, onClickEdit, onClickCansel }: TProps) => {
  const { userInfo } = useAppSelector((state) => state.users);

  return (
    <Stack p={1} border={'1px solid black'}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography>
          {item.user.name} {item.user.surname}
        </Typography>
        <Typography>Дата: {formatDateTimeFunction(item.date)}</Typography>
      </Stack>
      <Typography variant="h6">{item.text ? item.text : ''}</Typography>
      {item.media && <MediaDisplay url={item.media} />}
      {userInfo && userInfo.id === item.user.id && (
        <Stack direction={'row'} justifyContent={'flex-end'} gap={2}>
          <CustomButton theme="secondary" onClick={isEdit ? () => onClickCansel() : onClickEdit}>
            {isEdit ? 'Отмена' : 'Редактировать'}
          </CustomButton>
          <CustomButton theme="error" onClick={() => onClickDelete(item.id)} sx={{ marginLeft: '0px' }}>
            Удалить
          </CustomButton>
        </Stack>
      )}
    </Stack>
  );
});

export default Blog;
