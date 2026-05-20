import type { CSSProperties } from "react";

type SpinningOrbProps = {
  size?: "sm" | "md" | "lg";
  speedSeconds?: number;
};

type OrbStyle = CSSProperties & {
  "--orb-speed"?: string;
};

export function SpinningOrb({ size = "md", speedSeconds }: SpinningOrbProps) {
  const style: OrbStyle | undefined = speedSeconds
    ? { "--orb-speed": `${speedSeconds}s` }
    : undefined;

  return (
    <span aria-hidden="true" className={`orb-orbit orb-${size}`} style={style}>
      <span className="spinning-orb" />
    </span>
  );
}
