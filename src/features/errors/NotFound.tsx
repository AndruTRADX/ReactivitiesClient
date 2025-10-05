import { SearchOff } from '@mui/icons-material'
import { Button, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

export default function NotFound() {
  const navigator = useNavigate()

  return (
    <Paper
      sx={{
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 6,
      }}
    >
      <SearchOff sx={{ fontSize: 100 }} color='primary' />
      <Typography gutterBottom variant='h3'>
        Oops - we could not find what you are looking for
      </Typography>
      <Button fullWidth onClick={() => navigator('/activities')}>
        Return to the activities page
      </Button>
    </Paper>
  )
}
