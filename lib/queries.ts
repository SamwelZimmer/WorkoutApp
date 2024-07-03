import { Session } from "@supabase/supabase-js";

import { supabase } from "./supabase";
import { UserData } from "./types";

interface UpdatableUserData {
  username?: string;
  avatar_url?: string;
}

export async function getProfile(session: Session) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session?.user.id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as UserData;
  } catch (err) {
    console.error(err);
  }
}

export async function updateProfile(_data: UpdatableUserData) {
  const { data, error } = await supabase.from("profiles").update(_data);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
