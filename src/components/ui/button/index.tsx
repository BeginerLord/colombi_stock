import { Button } from "@mui/material";
interface PropsButton {
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonComponet = ({ name, onClick }: PropsButton) => {
  return (
    <>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        {name}
      </Button>
    </>
  );
};

export default ButtonComponet;
