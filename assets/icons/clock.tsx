import { Svg, Path, Circle } from "react-native-svg";

export const Clock = (props: React.SVGProps<SVGSVGElement>) => (
  <Svg
    viewBox="0 0 24 24"
    width={props.width}
    height={props.height}
    color={props.color}
    fill={"none"}
  >
    <Circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <Path
      d="M9.5 9.5L12.9999 12.9996M16 8L11 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
