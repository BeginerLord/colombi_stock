import React from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface MenuItemProps {
  text: string;
  path: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, path }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(path);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleNavigation}>
        <ListItemText
          primary={text}
          primaryTypographyProps={{ fontSize: '1.4rem' }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;