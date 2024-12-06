const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Announcements</h2>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-primary-light rounded-md p-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">Lorem ipsum dolor sit amet.</div>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2025-01-01
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
            consectetur.
          </p>
        </div>
        <div className="bg-secondary-light rounded-md p-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">Lorem ipsum dolor sit amet.</div>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2025-01-01
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
            consectetur.
          </p>
        </div>
        <div className="bg-tertiary-light rounded-md p-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">Lorem ipsum dolor sit amet.</div>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2025-01-01
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
            consectetur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
