import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {APIResponse} from '@/app/api/auth/APIResponse';
import {revokeAllSessions} from '@/lib/firebase/firebase-admin';

export async function GET() {
  const sessionCookie = cookies().get('__session')?.value;

  if (!sessionCookie) {
    return NextResponse.json<APIResponse<string>>(
      {
        success: false,
        error: 'Session not found.',
      },
      {status: 400},
    );
  }

  cookies().delete('__session');

  await revokeAllSessions(sessionCookie);

  return NextResponse.json<APIResponse<string>>({
    success: true,
    data: 'Success',
  });
}
