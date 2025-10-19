import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { LoginSchema } from '../schemas/loginSchema'
import agent from '../api/agent'
import { User } from '../types'
import { RegisterSchema } from '../schemas/registerSchema'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

export const useAccount = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const loginUser = useMutation({
    mutationFn: async (creds: LoginSchema) => {
      const response = await agent.post('/login?useCookies=true', creds)
      return response
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['user'] })
    },
  })

  const registerUser = useMutation({
    mutationFn: async (creds: RegisterSchema) => {
      const response = await agent.post('/register', creds)
      return response.data
    },
    onSuccess: async () => {
      toast.success('Registration successful! You can now log in.')
      navigate('/login')
    },
  })

  const logoutUser = useMutation({
    mutationFn: async () => {
      await agent.post('/account/logout')
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], null)
      queryClient.removeQueries({ queryKey: ['activities'] })
    },
  })

  const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await agent.get<User>('/account/user-info')
      return response.data
    },
  })

  return { loginUser, currentUser, logoutUser, loadingUserInfo, registerUser }
}
