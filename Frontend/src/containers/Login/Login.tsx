import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import { Alert, Avatar, Box, Container, Tab, Tabs, TextField, Typography } from '@mui/material';
import blue from '@mui/material/colors/blue';
import { Form, Formik } from 'formik';

import { CustomTabPanel } from '@/components/UI/CustomTabPanel/CustomTabPanel';
import { useLogin } from '@/containers/Login/useLogin';

const Login = () => {
  const {
    initialValues,
    validationSchema,
    handleSubmit,
    isSubmitted,
    userLoading,
    signInError,
    tabValue,
    a11yProps,
    handleChangeTab,
    signUpInitialValues,
    signUpValidationSchema,
    handleSignUpSubmit,
  } = useLogin();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{
              '& .MuiTab-root': {
                color: 'gray',
              },
              '& .Mui-selected': {
                borderRight: '2px solid',
                borderTop: '2px solid',
                borderLeft: '2px solid',
                borderColor: blue[700],
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                color: blue[700],
                fontWeight: 'bold',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: blue[700],
              },
            }}
          >
            <Tab sx={{ width: '198px' }} label={'createBatch.varnish'} {...a11yProps(0)} />
            <Tab sx={{ width: '198px' }} label={'thinner'} {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
              <Form>
                {(isSubmitted || signInError) && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {signInError}
                  </Alert>
                )}

                <TextField
                  name="email"
                  margin="normal"
                  fullWidth
                  label="login.email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  autoComplete="email"
                />

                <TextField
                  name="password"
                  margin="normal"
                  fullWidth
                  label="login.password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  autoComplete="current-password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <Box sx={{ position: 'relative', width: '100%' }}>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={isSubmitting || userLoading}
                    sx={{ mt: 3, mb: 2 }}
                    color="secondary"
                  >
                    Вход
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>

          <Formik
            initialValues={signUpInitialValues}
            validationSchema={signUpValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              handleSignUpSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
              <Form>
                {(isSubmitted || signInError) && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {signInError}
                  </Alert>
                )}

                <TextField
                  name="email"
                  margin="normal"
                  fullWidth
                  label="login.email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  autoComplete="email"
                />

                <TextField
                  name="password"
                  margin="normal"
                  fullWidth
                  label="login.password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  autoComplete="current-password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />

                <TextField
                  name="name"
                  margin="normal"
                  fullWidth
                  label="login.password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  autoComplete="name"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  name="surname"
                  margin="normal"
                  fullWidth
                  label="login.password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.surname}
                  autoComplete="surname"
                  error={touched.surname && Boolean(errors.surname)}
                  helperText={touched.surname && errors.surname}
                />

                <Box sx={{ position: 'relative', width: '100%' }}>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={isSubmitting || userLoading}
                    sx={{ mt: 3, mb: 2 }}
                    color="secondary"
                  >
                    Регистрация
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>
        </CustomTabPanel>
      </Box>
    </Container>
  );
};

export default Login;
