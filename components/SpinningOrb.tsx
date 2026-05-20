type SpinningOrbProps = {
  size?: "sm" | "md" | "lg";
};

export function SpinningOrb({ size = "md" }: SpinningOrbProps) {
  return (
    <span aria-hidden="true" className={`orb-orbit orb-${size}`}>
      <span className="spinning-orb" />
    </span>
  );
}
