import Image from "next/image";

export const HeaderMain = () => {
  return (
    <div className="w-full bg-[#dbaf1e] flex items-center justify-between">
      <Image src="/logo-thumbnail.png" alt="Logo" width={100} height={150} />
      <div className="flex-1 flex justify-center">
        <h1 className="text-white text-3xl">PicIt</h1>
      </div>
    </div>
  );
};
