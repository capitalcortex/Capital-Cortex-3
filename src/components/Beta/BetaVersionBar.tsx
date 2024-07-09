import Button from "../Buttons/Button";
const BetaVersionBar = () => {
  return (
    <div className="beta__container">
      <div>
        <p><span className="font-bold text-theme-gray-575">Capital Cortex Beta:&nbsp;</span> Register your interest in Capital Cortex, and be among the first users to help shape the future of the platform.</p>
        <Button size="medium" variant="black" as="link" url="#beta_join">Register Interest</Button>
      </div>
    </div>
  );
};

export default BetaVersionBar;
