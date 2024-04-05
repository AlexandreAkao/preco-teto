type ErrorContainerType = {
  children: React.ReactNode;
  errorMessage?: string;
  className?: string;
};

const ErrorContainer = ({
  children,
  errorMessage = "",
  className = "",
}: ErrorContainerType) => {
  return (
    <div className={className}>
      {children}
      <p className="text-xs text-red-500 font-semibold text-opacity-70 h-4">
        {errorMessage}
      </p>
    </div>
  );
};

export default ErrorContainer;
