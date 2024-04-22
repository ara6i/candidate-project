import React from 'react'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

interface RangeSliderProps {
  value: number[]
  onChange: (newValue: number | number[]) => void
  min: number
  max: number
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  value,
  onChange,
  min,
  max,
}) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue)
  }

  return (
    <div>
      <Typography sx={{ my: 4 }} variant="h6" textAlign={'center'}>
        Calorie Range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={min}
        max={max}
      />
      <Grid container justifyContent="space-between">
        <Typography variant="body2">Min: {value[0]}</Typography>
        <Typography variant="body2">Max: {value[1]}</Typography>
      </Grid>
    </div>
  )
}

export default RangeSlider
