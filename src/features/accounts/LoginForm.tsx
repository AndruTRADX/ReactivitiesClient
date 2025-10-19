import { useForm } from 'react-hook-form'
import { useAccount } from '../../lib/hooks/useAccount'
import { loginSchema, LoginSchema } from '../../lib/schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Paper, Typography, CircularProgress } from '@mui/material'
import { LockOpen } from '@mui/icons-material'
import TextInput from '../../app/shared/components/TextInput'
import { useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

export default function LoginForm() {
  const { loginUser, currentUser, loadingUserInfo } = useAccount()
  const navigate = useNavigate()
  const location = useLocation()
  const [isRedirecting, setIsRedirecting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: 'onTouched',
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (currentUser && !loadingUserInfo) {
      setIsRedirecting(true)
      const timer = setTimeout(() => {
        navigate(location.state?.from || '/activities', { replace: true })
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [currentUser, loadingUserInfo, navigate, location.state?.from])

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data)
  }

  if (isRedirecting) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='200px'>
        <CircularProgress />
        <Typography variant='body1' sx={{ ml: 2 }}>
          Redirigiendo...
        </Typography>
      </Box>
    )
  }

  return (
    <Paper
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        mx: 'auto',
        borderRadius: 3,
      }}
    >
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        gap={3}
        color='secondary.main'
      >
        <LockOpen fontSize='large' />
        <Typography variant='h4'>Sign in</Typography>
        <TextInput label='Email' control={control} name='email' />
        <TextInput label='Password' type='password' control={control} name='password' />
        <Button
          type='submit'
          disabled={!isValid || isSubmitting}
          variant='contained'
          size='large'
          fullWidth
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
        </Button>
        <Typography
          color='textPrimary'
          sx={{ textAlign: 'center', display: 'flex', gap: 1 }}
          component='span'
        >
          Don't have an account?{' '}
          <Typography
            color='primary'
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/register')}
            component='span'
          >
            Register.
          </Typography>
        </Typography>
      </Box>
    </Paper>
  )
}
