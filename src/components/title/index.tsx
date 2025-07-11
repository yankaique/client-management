export const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">{children}</h1>
    </div>
  );
};
