import { Button } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

interface PickSeatsPageProps {
  showingId: number;
}

const PickSeatsPage = ({ showingId }: PickSeatsPageProps) => {
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate({ to: "/checkout" });
  };

  return (
    <>
      <h2>Where would you like to sit for showing {showingId}?</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={handleProceedToPayment}
      >
        Proceed to Payment
      </Button>
    </>
  );
};
export default PickSeatsPage;
