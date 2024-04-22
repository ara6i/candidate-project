import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

function SkeletonChildrenDemo() {
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ margin: 1 }}>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        </Box>
      </Box>

      <Skeleton variant="rectangular" width="100%">
        <div style={{ paddingTop: '57%' }} />
      </Skeleton>
    </div>
  )
}

export default function SkeletonGrid() {
  return (
    <Grid container spacing={8}>
      {[...Array(5)].map((_, rowIndex) => (
        <Grid container item xs={12} key={rowIndex} spacing={8}>
          {[...Array(4)].map((_, colIndex) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={colIndex}>
              <SkeletonChildrenDemo />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  )
}
