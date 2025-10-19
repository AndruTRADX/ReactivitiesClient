import { useForm } from 'react-hook-form'
import { useAccount } from '../../lib/hooks/useAccount'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Paper, Typography, CircularProgress } from '@mui/material'
import { LockOpen } from '@mui/icons-material'
import TextInput from '../../app/shared/components/TextInput'
import { registerSchema, RegisterSchema } from '../../lib/schemas/registerSchema'
import { useNavigate } from 'react-router'

export default function RegisterForm() {
  const { registerUser } = useAccount()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    mode: 'onTouched',
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser.mutateAsync(data, {
      onError: error => {
        if (Array.isArray(error)) {
          error.forEach(err => {
            if (err.includes('Email')) {
              setError('email', { message: err })
            } else if (err.includes('Password')) {
              setError('password', { message: err })
            }
          })
        }
      },
    })
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
        <Typography variant='h4'>Register</Typography>
        <TextInput label='Email' control={control} name='email' />
        <TextInput label='Display Name' control={control} name='displayName' />
        <TextInput label='Password' type='password' control={control} name='password' />
        <Button
          type='submit'
          disabled={!isValid || isSubmitting}
          variant='contained'
          size='large'
          fullWidth
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Register'}
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Typography color='textPrimary' component='span'>
            Already have an account?{' '}
          </Typography>
          <Typography
            component='span'
            color='primary'
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/login')}
          >
            Sign in.
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}
