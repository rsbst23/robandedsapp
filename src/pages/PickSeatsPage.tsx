interface PickSeatsPageProps {
  showingId: number;
}

const PickSeatsPage = ({ showingId }: PickSeatsPageProps) => {
  return (
    <>
      <h2>Where would you like to sit for showing {showingId}?</h2>
    </>
  );
};
export default PickSeatsPage;
