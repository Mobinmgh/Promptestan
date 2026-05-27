import { getCurrentProfile, getCurrentUser } from "@/lib/auth/admin";

export async function canViewProContent() {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  const profile = await getCurrentProfile();

  return profile?.role === "admin" || profile?.subscription_status === "pro";
}

export async function getViewerState() {
  const user = await getCurrentUser();
  const profile = user ? await getCurrentProfile() : null;

  return {
    user,
    profile,
    canViewPro: profile?.role === "admin" || profile?.subscription_status === "pro",
    isAdmin: profile?.role === "admin",
  };
}
