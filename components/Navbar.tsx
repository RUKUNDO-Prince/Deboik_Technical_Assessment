import Image from "next/image";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "");

  return (
    <nav className="flex justify-between items-center p-4 bg-white border-b border-[#6A7E8A]/10">
      <Image src="/logo.png" alt="logo" width={150} height={150} />
      <div className="flex items-center gap-3">
        <Image src="/profile.png" alt="profile" width={30} height={30}  />
        <p className="hidden md:block">Hi, {user?.name}</p>
      </div>
    </nav>
  );
};

export default Navbar;
