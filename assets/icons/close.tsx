import { Svg, Path } from "react-native-svg";

export const Close = (props: React.SVGProps<SVGSVGElement>) => (
  <Svg
    viewBox="0 0 24 24"
    width={props.width}
    height={props.height}
    color={props.color}
    fill={"none"}
  >
    <Path
      d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
