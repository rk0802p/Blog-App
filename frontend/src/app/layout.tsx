'use client';

import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';
import './globals.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ApolloProvider>
      </body>
    </html>
  );
} 