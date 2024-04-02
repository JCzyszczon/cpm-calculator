import { Suspense } from "react";

export const metadata = {
    title: 'Diagram',
    alternates: {
      //canonical: 'https://weather.jczyszczon.pl/settings',
    },
}

export default function RootLayout({ children }) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    )
}