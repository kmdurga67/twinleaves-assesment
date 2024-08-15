import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Header = ({ username }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}
        
        <Typography variant={isMobile ? "h6" : "h4"} component="div" sx={{ flexGrow: 1 }}>
          Product Catalog
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountCircleIcon sx={{ mr: 1 }} />
          <Typography variant="body1" noWrap>
            {username || 'Guest'}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
