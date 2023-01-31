import { Menu, Button, List, ListItem } from "@mui/material";

interface ContextMenuProps {
  open: boolean;
  posX: number;
  posY: number;
}

const ContextMenu = ({ open, posX, posY }: ContextMenuProps) => {
  return (
    <Menu
      open={open}
      anchorReference="anchorPosition"
      anchorPosition={{ top: posY, left: posX }}
    >
      <List>
        <ListItem>
          <Button>Insert row above</Button>
        </ListItem>
        <ListItem>
          <Button>Insert row below</Button>
        </ListItem>
        <ListItem>
          <Button>Delete row</Button>
        </ListItem>
      </List>
    </Menu>
  );
};

export default ContextMenu;
