interface Props {
  number: string;
  title: string;
  content: string;
}
export const Step: React.FC<Props> = ({ number, title, content }) => {
  return (
    <div className="flex items-center  gap-4 p-6 bg-white/60 shadow-md rounded-lg w-full max-w-2xl">
      <div>
        <div className="flex items-center justify-center w-12 h-12 text-xl font-bold text-white bg-accentBeige rounded-full">
          {number}
        </div>
      </div>
      <div className="">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="pt-2 whitespace-pre-wraps">{content}</p>
      </div>
    </div>
  );
};
