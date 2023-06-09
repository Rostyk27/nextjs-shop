const Loader = () => {
  return (
    <div className="m-10 flex items-center justify-center">
      <div className="relative h-16 w-16">
        <div className="a-0 z-0 rounded-full border-4 border-solid border-color-primary"></div>
        <div className="a-0 z-10 rounded-full border-4 border-solid border-transparent border-b-color-secondary motion-safe:animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
