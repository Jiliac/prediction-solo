import { useState } from "react";
import { useForm } from "react-hook-form";
import { useContractEvent } from "wagmi";

import { makeOnSubmit, NewMarketData } from "./submit";
import { Label, ErrorsDisplay, ProbabilityInput } from "./formUtils";

import FactoryContract from "artifacts/contracts/MarketFactory.sol/MarketFactory.json";

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
