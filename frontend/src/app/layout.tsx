import '@/assets/styles/globals.css';
import inter from '@/assets/fonts/inter';
import Providers from '@/components/parts/Providers';
import { Toaster } from '@/components/ui/toaster';
import generateMetadata from '@/lib/metadata';
import { cn } from '@/lib/utils';

export const metadata = generateMetadata();

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, 'font-sans antialiased')}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
