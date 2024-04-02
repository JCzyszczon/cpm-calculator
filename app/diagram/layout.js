import { Suspense } from "react";

export const metadata = {
    title: 'Diagram - CPM Calculator',
}

export default function RootLayout({ children }) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    )
}