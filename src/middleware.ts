import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const loginRoute = '/login';
const homeRoute = '/home';
const adminRoutePrefix = '/admin';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Kiểm tra đăng nhập và vai trò người dùng
  const isLoggedIn = checkUserLoggedIn(req);
  const userRole = getUserRole(req);

  // Kiểm tra đăng nhập
  if (!isLoggedIn && pathname !== loginRoute) {
    return NextResponse.redirect(new URL(loginRoute, req.url));
  }

  if (isLoggedIn && pathname === loginRoute) {
    return NextResponse.redirect(new URL(homeRoute, req.url));
  }

  // Kiểm tra vai trò admin khi vào route admin
  if (
    pathname.startsWith(adminRoutePrefix) 
    // && userRole !== 1
  ) {
    return NextResponse.redirect(new URL(homeRoute, req.url));
  }

  return NextResponse.next();
}

// Hàm kiểm tra đăng nhập
function checkUserLoggedIn(req: NextRequest): boolean {
  const token = req.cookies.get('auth_token')?.value;
  return !!token;
}

// Hàm lấy vai trò người dùng
function getUserRole(req: NextRequest): number | null {
  const role = req.cookies.get('user_role')?.value;
  return role ? parseInt(role, 10) : null;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};