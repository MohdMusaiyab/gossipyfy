import {getServerSession} from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
export async function requireAuth(req: Request) {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return new Response(JSON.stringify({
        message: "Not authenticated, please login",
        success: false,
      }), {
        status: 401,
      });
    }
  
    return session; // Return session if authenticated
  }