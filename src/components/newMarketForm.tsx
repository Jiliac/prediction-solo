import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContractEvent, useContractWrite } from "wagmi";
import { ethers } from "ethers";

import FactoryContract from "artifacts/contracts/MarketFactory.sol/MarketFactory.json";

interface NewMarketData {
  name: string;
  probability: string;
  liquidity: string;
}

const Label = ({ name, children }: { name: string; children?: any }) => {
  return (
    <label className="label">
      <span className="label-text">{name}</span>
      {children}
    </label>
  );
};

const ErrorsDisplay = ({ errors }: any) => {
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

const ProbabilityInput = ({ register, prob }: any) => {
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

const makeOnSubmit = (contractAddr: string) => {
  const { write, isError, error } = useContractWrite(
    {
      addressOrName: contractAddr,
      contractInterface: FactoryContract.abi,
    },
    "createMarket"
  );

  const onSubmit: SubmitHandler<NewMarketData> = (data: NewMarketData) => {
    const prob = (Number(data.probability) / 100).toString();
    const liquidityEth = ethers.utils.parseEther(data.liquidity);
    const probabilityEth = ethers.utils.parseEther(prob);

    write({
      args: [data.name, probabilityEth],
      overrides: { value: liquidityEth, gasLimit: 1e7 },
    });
  };

  useEffect(() => {
    if (isError) {
      console.error("write error:", error);
      console.error("error msg:", error?.message);
    }
  }, [isError, error]);

  return onSubmit;
};

export const Events = ({ contractAddr }: { contractAddr: string }) => {
  const [events, setEvents] = useState<Array<Event>>([]);
  useContractEvent(
    { addressOrName: contractAddr, contractInterface: FactoryContract.abi },
    "NewMarket",
    (newEvent) => {
      setEvents((oldEvents) => [...oldEvents, newEvent]);
    }
  );

  return <p>{JSON.stringify(events)}</p>;
};

export const NewMarketForm = ({ contractAddr }: { contractAddr: string }) => {
  const onSubmit = makeOnSubmit(contractAddr);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewMarketData>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="shadow-lg rounded-xl mt-7 p-8 w-full"
    >
      <ErrorsDisplay errors={errors} />

      <div className="form-control my-6">
        <Label name="Question" />
        <input
          type="text"
          placeholder="Where will the sun rise?"
          {...register("name", { required: true })}
          className="input input-bordered"
        />
      </div>

      <div className="form-control my-6">
        <Label name="Initial Probability" />
        <ProbabilityInput register={register} prob={watch("probability")} />
      </div>

      <div className="form-control my-6">
        <div className="mx-auto">
          <Label name="Market Liquidity">
            <span className="label-text-alt flex">
              <div
                className="tooltip tooltip-primary tooltip-left"
                data-tip="Liquidity should be at least 1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </span>
          </Label>
          <label className="input-group">
            <input
              type="text"
              {...register("liquidity", {
                required: true,
                pattern: /[+-]?([0-9]*[.])?[0-9]+/,
                validate: (value: string): boolean => {
                  const eth = parseFloat(value);
                  if (!eth) return false;
                  return eth > 1.0;
                },
              })}
              className="input input-bordered"
              placeholder="1.1"
            />
            <span>Matic</span>
          </label>
          <label className="label"></label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-lg mt-7">
        Create Market
      </button>

      {/* <Events contractAddr={contractAddr} /> */}
    </form>
  );
};
