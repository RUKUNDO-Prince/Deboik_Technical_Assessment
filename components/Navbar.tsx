import Image from "next/image";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState<{ name?: string } | null>(null);
  
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="flex justify-between items-center p-4 bg-white border-b border-[#6A7E8A]/10">
      <Image src="/logo.png" alt="logo" width={150} height={150} />
      <div className="flex items-center gap-3">
        <Image src="/profile.png" alt="profile" width={30} height={30} />
        <p className="hidden md:block">Hi, {user?.name || 'Guest'}</p>
      </div>
    </nav>
  );
};

export default Navbar;