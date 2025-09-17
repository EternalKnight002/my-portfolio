import './globals.css'
import { ReactNode } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer';
import './globals.css';



export const metadata = {
title: 'Aman Kumar — Full Stack Developer',
description: 'I build cloud-native apps with Java, React, and Spring Boot.'
}


export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="en">
<body>
<div className="min-h-screen flex flex-col">
<Nav />
<main className="flex-1">{children}</main>
<footer className="py-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} Aman Kumar</footer>
</div>
</body>
</html>
)
}