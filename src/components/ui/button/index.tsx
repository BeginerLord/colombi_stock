import { Button } from "@mui/material";
interface PropsButton {
  name: string;
  type?: "button" | "submit" | "reset";

  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonComponet = ({ name, onClick, type = "button" }: PropsButton) => {
  return (
    <>
      <Button
type={type}        variant="contained"
        color="primary"
        onClick={onClick}
      >
        {name}
      </Button>
    </>
  );
};

export default ButtonComponet;
