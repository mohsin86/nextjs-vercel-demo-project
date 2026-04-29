import Image from "next/image";
import Link from 'next/link' 

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-sm text-gray-500 row-start-3 test">
         <ul> 
                <li><Link href="/">Home</Link></li> 
                <li><Link href="/products/">Products</Link></li>
                <li><Link href="/contacts/">Contacts</Link></li>
                <li><Link href="/about">About Us</Link></li>
            </ul>
        </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        This is home page 3
       </main>
       
    </div>
  );
}
