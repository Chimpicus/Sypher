interface IProps {
  isPending: boolean;
}

export const PadlockSpinner = ({ isPending }: IProps) => {
  console.log(isPending);
  return (
    <div className="h-full w-full flex justify-center items-baseline">
      <span className="loader"></span>
    </div>
  );
};
