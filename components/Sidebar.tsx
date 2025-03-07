import Image from "next/image";

const Sidebar = () => {

  return (
    <aside className="hidden lg:block bg-white text-[#013C61] p-5 transition-all">
        <ul>
          <li className="flex flex-col items-center justify-between gap-8 p-2  rounded cursor-pointer">
            <Image src="/1.svg" alt="icon" width={25} height={25} />
            <Image src="/2.svg" alt="icon" width={25} height={25} />
            <Image src="/3.svg" alt="icon" width={25} height={25} />
          </li>
        </ul>
    </aside>
  );
};

export default Sidebar;
