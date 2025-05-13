import Navbar from "../ui/navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <hr className="h-0.5 bg-gray-200" />
      <main className="bg-slate-100">{children}</main>
    </div>
  );
}
