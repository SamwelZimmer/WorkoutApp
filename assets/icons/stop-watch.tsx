import { Svg, Path, Circle } from "react-native-svg";

export const StopWatch = (props: React.SVGProps<SVGSVGElement>) => (
  <Svg
    viewBox="0 0 24 24"
    width={props.width}
    height={props.height}
    color={props.color}
    fill={"none"}
  >
    <Path
      d="M18 5.5L19 4.5M5 4.5L6 5.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="12"
      cy="13"
      r="9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M12 9.5V13.5L14 15.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 3.5V2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 2H14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
