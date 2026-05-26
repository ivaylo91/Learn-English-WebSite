import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/types/database";

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return data;
}

export async function updateProfile(
  userId: string,
  updates: Partial<Pick<Profile, "name" | "level">>
): Promise<void> {
  const supabase = createClient();
  await supabase.from("profiles").update(updates).eq("id", userId);
}
