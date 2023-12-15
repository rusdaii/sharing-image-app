import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 7,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      authorize: async (credentials) => {
        const { id, username, avatarUrl, accessToken } = credentials as {
          id: string;
          username: string;
          avatarUrl: string;
          accessToken: string;
        };

        const user = {
          id: id,
          username: username,
          avatarUrl: avatarUrl,
          accessToken: accessToken,
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {},
};
