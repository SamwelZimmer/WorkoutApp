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

export type Exercise = {
  name: string;
  type: ExerciseType | null;
  variations?: string[];
  created_at?: string;
  updated_at?: string;
};

export type ExerciseType = "sets" | "interval" | "duration" | "misc";

export interface IOpenAIMessages {
  role: string;
  content: string;
}

export interface IOpenAIUserHistory {
  user: string;
  assistant: string;
  fileIds?: any[];
}

export interface IOpenAIStateWithIndex {
  index: string;
  messages: IOpenAIUserHistory[];
}

export interface Model {
  name: string;
  label: string;
  icon?: any;
}

export type ModalType = "create_exercise" | "edit_exercise";
