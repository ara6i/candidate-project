import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { CustomAccordionProps } from './types'

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  title,
  children,
  open
}) => {
  return (
    <Accordion sx={{ my: 4 }} defaultExpanded={open}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{children}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default CustomAccordion
