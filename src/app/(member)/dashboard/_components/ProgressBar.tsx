interface Props {
  progressPercent: number;
}
export const ProgressBar: React.FC<Props> = ({ progressPercent }) => {
  return (
    <div className="w-[150px] h-[15px] bg-gray-300 overflow-hidden flex">
      <div
        className="h-full bg-accentBeige relative"
        style={{ width: `${progressPercent}%` }}
      >
        <div className="absolute text-xs pl-[70px]">{`${progressPercent}%`}</div>
      </div>
      <div
        className="h-full bg-gray/20"
        style={{ width: `${100 - progressPercent}%` }}
      ></div>
    </div>
  );
};
