import { useState, useEffect } from "react";
import { useResolve, useReadMarket } from "src/hooks";

const YesEnum = 0;
const NoEnum = 1;
const NaEnum = 2;

export const ResolvedStatus = ({ contractAddr }: { contractAddr: string }) => {
  const resolvedOutcome = useReadMarket(contractAddr, "resolvedOutcome");
  const [outcome, setOutcome] = useState<string>("");

  useEffect(
    () => setOutcome(["YES", "NO", "N/A"][resolvedOutcome]),
    [resolvedOutcome]
  );

  return (
    <div className="rounded-xl shadow-xl py-6 px-6 betbox mt-10">
      <article className="prose my-3">
        <h2>Market has been resolved to {outcome}.</h2>
      </article>
    </div>
  );
};

export const Resolution = ({ contractAddr }: { contractAddr: string }) => {
  const [resolving, setResolving] = useState<boolean>(false);
  const write = useResolve(contractAddr);

  const resolved = useReadMarket(contractAddr, "resolved");
  if (resolved) return null;

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
            onClick={() => write({ args: [YesEnum] })}
          >
            Resolve to YES
          </button>
        </div>
        <div>
          <button
            className="btn btn-lg btn-primary my-3"
            onClick={() => write({ args: [NoEnum] })}
          >
            Resolve to NO
          </button>
        </div>
        <div>
          <button
            className="btn btn-lg btn-primary mt-3"
            onClick={() => write({ args: [NaEnum] })}
          >
            Resolve to N/A
          </button>
        </div>
      </div>
    </div>
  );
};
