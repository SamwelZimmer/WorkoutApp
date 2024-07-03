export type IconMapType = {
  [key: string]: React.ComponentType<any>;
};

export type UserData = {
  username?: string;
  avatar_url?: string;
};

export type Activity = {
  name: string;
  type: string;
};
