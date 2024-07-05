import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import icons from '../icons/icons'; 


const {  HomeIcon, UploadIcon, LikesIcon, SearchIcon, UserIcon } = icons;

const TopNavigation = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  const handleHomeClick = () => {
    navigate('/'); 
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            <Button color="inherit" onClick={handleHomeClick}>
              <i>طلعات</i>
            </Button>
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
            <Button color="inherit" onClick={handleHomeClick}>
              <HomeIcon color={'white'} />
            </Button>
            <Button color="inherit" onClick={() => navigate('/search')}>
            <SearchIcon color={'white'} />
            </Button>
            <Button color="inherit" onClick={() => navigate('/post')}>
            <UploadIcon color={'white'} />
            </Button>
            <Button color="inherit" onClick={() => navigate('/user-likes')}>
            <LikesIcon color={'white'} />
            </Button>
            <Button color="inherit" onClick={() => navigate('/profile')}>
            <UserIcon color={'white'} />
            </Button>
          </Box>
          <Button color="inherit" onClick={handleLoginClick}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopNavigation;
