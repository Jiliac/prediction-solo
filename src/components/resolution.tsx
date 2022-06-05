import { useState } from "react";

const YesEnum = 0;
const NoEnum = 1;
const NaEnum = 2;

export const Resolution = () => {
  const [resolving, setResolving] = useState<boolean>(false);
  const write = (doo: any) => {};

  if (!resolving) {
    return (
      <div className="rounded-xl shadow-xl py-6 px-6 betbox mt-10">
        <button
          className="btn btn-lg btn-primary"
          onClick={() => setResolving(true)}
        >
          Resolve Market
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl shadow-xl py-6 px-6 betbox mt-10">
      <article className="prose mb-3">
        <h2>Choose the outcome:</h2>
      </article>

      <div className="flex flex-col">
        <div>
          <button
            className="btn btn-lg btn-primary my-3"
            onClick={() => write(YesEnum)}
          >
            Resolve to YES
          </button>
        </div>
        <div>
          <button
            className="btn btn-lg btn-primary my-3"
            onClick={() => write(NoEnum)}
          >
            Resolve to NO
          </button>
        </div>
        <div>
          <button
            className="btn btn-lg btn-primary mt-3"
            onClick={() => write(NaEnum)}
          >
            Resolve to N/A
          </button>
        </div>
      </div>
    </div>
  );
};
