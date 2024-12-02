import { Button } from "@mui/material";
interface PropsButton {
  name: string;
  type?: "button" | "submit" | "reset";
}

const ButtonComponet = ({ name, type = "button" }: PropsButton) => {
  return (
    <>

  
      <Button style={{ fontSize: '1.4rem', padding: '0.7rem 1.7rem' }}
type={type}        variant="contained"
        color="primary"
      >
 
        {name}
      </Button>
    </>
  );
};

export default ButtonComponet;
