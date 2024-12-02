import { Button } from "@mui/material";
interface PropsButton {
  name: string;
  type?: "button" | "submit" | "reset";
}

const ButtonComponet = ({ name, type = "button" }: PropsButton) => {
  return (
    <>
      <Button type={type} variant="contained" color="primary">
        {name}
      </Button>
    </>
  );
};

export default ButtonComponet;
