import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function ClientCard({ name, email, phone, address }) {
  const theme = useTheme();
  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', width: "100%" }} >
      <Box sx={{ display: 'flex', }} fullwidth  >
        <CardContent >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" component="h5" >
              Name:
            </Typography>
            <Typography variant="subtitle1" paddingLeft={1} component="div">{name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" component="h5" >
              Email:
            </Typography>
            <Typography variant="subtitle1" paddingLeft={1} component="div">{email}</Typography>
          </Box><Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" component="h5" >
              Phone:
            </Typography>
            <Typography variant="subtitle1" paddingLeft={1} component="div">{phone}</Typography>
          </Box><Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" component="h5" >
              Address:
            </Typography>
            <Typography variant="subtitle1" paddingLeft={1} component="div">{address}</Typography>
          </Box>

        </CardContent>
      </Box>
    </Card>
  );
}
