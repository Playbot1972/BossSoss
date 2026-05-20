type SpinningOrbProps = {
  size?: "sm" | "md" | "lg";
};

export function SpinningOrb({ size = "md" }: SpinningOrbProps) {
  return <span aria-hidden="true" className={`spinning-orb orb-${size}`} />;
}
