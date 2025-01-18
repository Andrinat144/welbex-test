import { LoadingButton } from '@mui/lab';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
  theme?: 'primary' | 'secondary' | 'error';
  to?: string;
  loading?: boolean;
}

const CustomButton = ({ theme, loading = false, children, ...props }: ButtonProps) => {
  return loading ? (
    <LoadingButton color={theme} {...props} variant="contained" loading={loading}>
      {children}
    </LoadingButton>
  ) : (
    <MuiButton color={theme} {...props} variant="contained">
      {children}
    </MuiButton>
  );
};

export default CustomButton;
