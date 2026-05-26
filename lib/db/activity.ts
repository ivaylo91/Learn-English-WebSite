import { createClient } from "@/lib/supabase/client";
import type { Module, UserActivity } from "@/lib/types/database";

export async function recordActivity(
  userId: string,
  module: Module,
  action: string,
  xp = 0,
  metadata: Record<string, unknown> = {}
): Promise<void> {
  const supabase = createClient();
  await supabase.rpc("record_activity", {
    p_user_id: userId,
    p_module:  module,
    p_action:  action,
    p_xp:      xp,
    p_meta:    metadata,
  });
}

export async function getRecentActivity(
  userId: string,
  limit = 10
): Promise<UserActivity[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("user_activity")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}
