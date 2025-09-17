export default function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-gray-500 mt-12">
      <div className="container mx-auto px-6">
        © {new Date().getFullYear()} Aman Kumar — Built with Next.js + Tailwind
      </div>
    </footer>
  );
}
