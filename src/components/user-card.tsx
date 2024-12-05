import Image from "next/image";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:bg-secondary even:bg-tertiary p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-light px-2 py-1 rounded-full text-green-500">
          2024/25
        </span>
        <Image src="/more.png" alt="More" width={20} height={20} />
      </div>
      <h2 className="text-2xl font-semibold my-4">1,234</h2>
      <h3 className="capitalize text-sm font-medium text-gray-500">
        {type + "s"}
      </h3>
    </div>
  );
};

export default UserCard;
