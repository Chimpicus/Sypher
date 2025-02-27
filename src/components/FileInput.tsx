import { PadlockSpinner } from "./PadlockSpinner";
interface Iprops {
  isPending: boolean;
  file: File;
  setFile: (file: File) => void;
  fn: (file: File) => void;
  url?: string;
  title: string;
  pendingText: string;
  buttonText: string;
}
const FileInput = ({
  isPending,
  file,
  setFile,
  fn,
  url,
  title,
  pendingText,
  buttonText,
}: Iprops) => {
  return (
    <>
      <div className="p-4 flex flex-col items-center w-1/2 h-1/2 space-y-2">
        <h2 className="text-2xl text-green-100 font-bold m-2">{title}</h2>
        <div className="h-2/3 w-full flex flex-col items-center space-x-2 border border-red-500">
          {isPending ? (
            <PadlockSpinner isPending={true} />
          ) : (
            <>
              <input
                type="file"
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
                className="w-full text-lg text-zinc-500 border border-zinc-500
                file:mr-5 file:px-3 file:border-[1px] file:border-green-200
                file:text-lg file:font-medium
                file:bg-zinc-50 file:text-zinc-700
                hover:file:cursor-pointer hover:file:bg-green-50
                hover:file:text-green-700"
              />
              {/* <div
                  id="drop_zone"
                  ondrop="dropHandler(event);"
                  ondragover="dragOverHandler(event);"
                >
                  <p>
                    Drag one or more files to this <i>drop zone</i>.
                  </p>
                </div> */}
            </>
          )}
        </div>
        {isPending ? (
          <p className="text-green-200">{pendingText}</p>
        ) : (
          <button
            onClick={() => fn(file!)}
            className="p-2 py-1 text-xl bg-green-400 text-zinc-800 rounded uppercase"
          >
            {buttonText}
          </button>
        )}
        {url && (
          <>
            <p className="text-green-100">follow link for decryption service</p>
            <a
              className="text-green-200 hover:text-green-300"
              href={url}
              target="_blank"
            >
              {url}
            </a>
          </>
        )}
      </div>
    </>
  );
};

export default FileInput;
