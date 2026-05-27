import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/napredak", "/profil", "/rechnik/study"];
const ADMIN_ROUTES = ["/admin"];

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Skip if Supabase not configured yet
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options as Parameters<typeof supabaseResponse.cookies.set>[2])
        );
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAdmin     = ADMIN_ROUTES.some((r) => pathname.startsWith(r));

  // Redirect unauthenticated users away from protected routes
  if (isProtected && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect non-admin users away from admin routes
  if (isAdmin) {
    const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map(e => e.trim());
    if (!user || !adminEmails.includes(user.email ?? "")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Redirect logged-in users away from auth pages
  if (user && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/napredak", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
