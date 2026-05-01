
import 'primereact/resources/themes/lara-light-blue/theme.css'; // theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../(admin)/assets/appAdmin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <aside></aside>
      <main>{children}</main>
    </>
  );
}