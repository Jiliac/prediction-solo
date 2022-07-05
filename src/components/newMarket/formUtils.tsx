import { useState, useEffect } from "react";

export const ErrorsDisplay = ({ errors }: any) => {
  const missingProps: Array<string> = [];
  if (errors.name) missingProps.push("question");
  if (errors.probability) missingProps.push("probability");
  if (errors.liquidity) missingProps.push("liquidity");

  if (missingProps.length === 0) return null;

  return (
    <div className="alert alert-error shadow-lg">
      <div>
        <span>
          Invalid fields:{" "}
          <span className="italic">{missingProps.join(", ")}</span>.
        </span>
      </div>
    </div>
  );
};

export const Label = ({ name, children }: { name: string; children?: any }) => {
  return (
    <label className="label">
      <span className="label-text">{name}</span>
      {children}
    </label>
  );
};

export const ProbabilityInput = ({ register, prob }: any) => {
  const [probability, setProbability] = useState<string>("");
  useEffect(() => setProbability(prob), [prob]);

  return (
    <div className="flex flex-row gap-10">
      <label className="input-group basis-1/4">
        <input
          type="text"
          className="input input-bordered w-16"
          placeholder="42"
          value={probability}
          {...register("probability", {
            required: true,
            pattern: /[+-]?([0-9]*[.])?[0-9]+/,
          })}
        />
        <span>%</span>
      </label>

      <input
        type="range"
        min="0"
        max="100"
        className="range range-primary basis-3/4 my-auto"
        value={probability}
        onChange={(e) => setProbability(e.target.value)}
      />
    </div>
  );
};
