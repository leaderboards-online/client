import Logo from "./Logo";

const SuspenseFallback = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-almostBlack text-center text-almostWhite">
      <Logo />
      loading...
    </div>
  );
};

export default SuspenseFallback;
