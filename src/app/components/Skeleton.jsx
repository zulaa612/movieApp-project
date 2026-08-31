export const Skeleton = ({ className = "" }) => {
  return (
    <div className={`bg-gray-400 animate-pulse rounded-lg ${className}`}></div>
  );
};
