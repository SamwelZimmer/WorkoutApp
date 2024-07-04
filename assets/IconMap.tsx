import React, { ReactElement } from "react";
import { IconMapType } from "@/lib/types";

import { AddSquare } from "@/assets/icons/add-square";
import { Add } from "@/assets/icons/add";
import { Apple } from "@/assets/icons/apple";
import { ArrowLeft } from "@/assets/icons/arrow-left";
import { ChevronLeft } from "@/assets/icons/chevron-left";
import { Clock } from "@/assets/icons/clock";
import { Dumbbell } from "@/assets/icons/dumbbell";
import { Eye } from "@/assets/icons/eye";
import { EyeClosed } from "@/assets/icons/eye-closed";
import { Google } from "@/assets/icons/google";
import { GraphUp } from "@/assets/icons/graph-up";
import { Home } from "@/assets/icons/home";
import { Notebook } from "@/assets/icons/notebook";
import { Pencil } from "@/assets/icons/pencil";
import { Search } from "@/assets/icons/search";
import { StopWatch } from "@/assets/icons/stop-watch";
import { Toggles } from "@/assets/icons/toggles";
import { User } from "@/assets/icons/user";

interface IconProps {
  name: keyof typeof IconMap;
  color?: string;
  size?: number;
}

export const IconMap: IconMapType = {
  pencil: Pencil,
  search: Search,
  toggles: Toggles,
  clock: Clock,
  "stop-watch": StopWatch,
  "add-square": AddSquare,
  "chevron-left": ChevronLeft,
  user: User,
  "graph-up": GraphUp,
  home: Home,
  add: Add,
  "arrow-left": ArrowLeft,
  "eye-closed": EyeClosed,
  eye: Eye,
  dumbbell: Dumbbell,
  notebook: Notebook,
  google: Google,
  apple: Apple,
};

export const Icon = ({
  name,
  color = "#000000",
  size = 16,
}: IconProps): ReactElement | null => {
  const IconComponent = IconMap[name];
  if (!IconComponent) return null;

  return React.createElement(IconComponent, {
    width: size,
    height: size,
    color,
  });
};
