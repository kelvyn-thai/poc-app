import React from "react";

export interface ICoreButtonProps {
  title?: string;
  className?: string;
  useToUploadFile?: boolean;
  onHandleUploadFile?: (event: React.ChangeEvent<HTMLInputElement>) => any;
  isDisabled?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => any | undefined;
}

const CoreButton: React.FC<
  ICoreButtonProps & React.HTMLAttributes<HTMLButtonElement>
> = ({
  title,
  children,
  className,
  useToUploadFile,
  onHandleUploadFile,
  isDisabled,
  onClick,
  ...rest
}) => {
  const refInputFile: React.MutableRefObject<HTMLInputElement | null> =
    React.useRef(null);
  return (
    <button
      type="button"
      className={`h-10 p-2 w-fit bg-blue-500 ${className} ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (isDisabled) {
          return;
        }
        if (useToUploadFile && refInputFile.current) {
          refInputFile.current.value = "";
          refInputFile.current.click();
        }
        if (typeof onClick === "function") {
          onClick(event);
        }
      }}
      {...rest}
    >
      {title && (
        <div className="text-white font-normal text-base leading-5">
          {title}
        </div>
      )}
      {children}
      <input
        ref={refInputFile}
        type="file"
        className="hidden"
        onChange={async (e) => {
          e.preventDefault();
          if (typeof onHandleUploadFile === "function") {
            onHandleUploadFile(e);
          }
        }}
      />
    </button>
  );
};

CoreButton.defaultProps = {
  title: "",
  className: "",
  useToUploadFile: false,
  onHandleUploadFile: undefined,
  isDisabled: false,
  onClick: undefined,
};

export default React.memo(CoreButton);
