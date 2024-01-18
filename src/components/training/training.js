import React, { useState } from 'react'

import { Box, Typography, Card, Checkbox } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { IconButton } from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'

export default function Customizedtraining({ keys, trainingInfo, training }) {
  const theme = useTheme()
  const [selectedTraining, setSelectedTraining] = useState(null)

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '30px',
        minWidth: '280px',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        {selectedTraining !== keys ? (
          <IconButton onClick={() => setSelectedTraining(keys)}>
            <PlayCircleOutlineIcon
              style={{ fontSize: '2rem', color: theme.palette.primary.main }}
            />
          </IconButton>
        ) : (
          <>
            <IconButton onClick={() => setSelectedTraining(null)}>
              <HighlightOffIcon />
            </IconButton>
            <img
              style={{
                width: '160px',
                height: 'auto',
                borderRadius: '20px',
                border: '1px solid rgba(128, 128, 128, 0.5)',
                //   display: selectedTraining === keys ? 'block' : 'none',
              }}
              src={trainingInfo[training][keys]['giff']}
              alt="GIF"
            />
          </>
        )}

        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography variant="h6" color={theme.palette.text.main}>
            Treino {keys}
          </Typography>

          <Checkbox defaultChecked={false} size="small" />
        </Box>
        <Typography variant="body1" color="text.secondary">
          {trainingInfo[training][keys]['tamanho']}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Pausa: {trainingInfo[training][keys]['tempo_pausa']} segundos
        </Typography>
      </Box>
    </Card>
  )
}
