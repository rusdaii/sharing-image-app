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
      authorize: async (credentials) => {
        const { username, avatarUrl, accessToken } = credentials as {
          username: string;
          avatarUrl: string;
          accessToken: string;
        };

        const user = {
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
