 // SideBarComponent.tsx
import StartOutlinedIcon from "@mui/icons-material/StartOutlined";
import styles from "./Sidebar.module.css";
import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
} from "@mui/material";
import { useState } from "react";
import MenuItem from './MenuItem';

interface MenuItemProps {
  text: string;
  path: string;
}

interface SideBarComponentProps {
  menuItems: MenuItemProps[];
}

const SideBarComponent: React.FC<SideBarComponentProps> = ({ menuItems }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item, index) => (
          <MenuItem key={index} text={item.text} path={item.path} />
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <div className={styles.icon_container}>
          <StartOutlinedIcon fontSize={"large"} color={"primary"} />
        </div>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SideBarComponent;