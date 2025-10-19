import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import agent from '../api/agent'
import { useLocation } from 'react-router'
import { UpdateActivitySchema } from '../schemas/updateActivitySchema'
import { Activity } from '../types'
import { useAccount } from './useAccount'

export const useActivities = (id?: string) => {
  const queryClient = useQueryClient()
  const { currentUser } = useAccount()
  const location = useLocation()

  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await agent.get<Activity[]>('/activities')
      return response.data
    }, 
    enabled: !id && location.pathname == '/activities' && !!currentUser,
    // staleTime: 1000 * 60 * 5 /* Specifies how much we can wait to fetch the data again */
  })

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ['activities', id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`)
      return response.data
    },
    // Here we specify that we will only fetch the data if the id exists
    enabled: !!id && !!currentUser,
  })

  const createActivity = useMutation({
    mutationFn: async (activity: unknown) => {
      const response = await agent.post('/activities', activity)
      return response.data
    },
    onSuccess: async () => {
      // onSuccess, we update the cached activities, to get the latest ones
      await queryClient.invalidateQueries({
        queryKey: ['activities'],
      })
    },
  })

  const updateActivity = useMutation({
    mutationFn: async (activity: UpdateActivitySchema) => {
      await agent.put('/activities', activity)
    },
    onSuccess: async () => {
      // onSuccess, we update the cached activities, to get the latest ones
      await queryClient.invalidateQueries({
        queryKey: ['activities'],
      })
    },
  })

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`)
    },
    onSuccess: async () => {
      // onSuccess, we update the cached activities, to get the latest ones
      await queryClient.invalidateQueries({
        queryKey: ['activities'],
      })
    },
  })

  return {
    activities,
    activity,
    isLoadingActivity,
    isLoading,
    updateActivity,
    createActivity,
    deleteActivity,
  }
}
