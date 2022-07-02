import { SubmitHandler, useForm } from "react-hook-form";

interface NewMarketData {
  name: string;
  probability: string;
  liquidity: string;
}

const Label = ({ name }: { name: string }) => {
  return (
    <label className="label">
      <span className="label-text">{name}</span>
    </label>
  );
};

const ErrorsDisplay = ({ errors }) => {
  const missingProps: Array<string> = [];
  if (errors.name) missingProps.push("question");
  if (errors.probability) missingProps.push("probability");
  if (errors.liquidity) missingProps.push("liquidity");

  if (missingProps.length === 0) return null;

  return (
    <div className="alert alert-error shadow-lg">
      <div>
        <span>
          Missing <span className="italic">{missingProps.join(", ")}</span>{" "}
          filled.
        </span>
      </div>
    </div>
  );
};

export const NewMarketForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewMarketData>();

  const onSubmit: SubmitHandler<NewMarketData> = (data: NewMarketData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="shadow-lg rounded-xl mt-7 p-7 w-full"
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
        <div className="flex flex-row gap-10">
          <label className="input-group basis-1/4">
            <input
              type="text"
              {...register("probability", { required: true })}
              className="input input-bordered w-14"
              placeholder="42"
            />
            <span>%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            className="range range-primary basis-3/4 my-auto"
          />
        </div>
      </div>

      <div className="form-control my-6">
        <div className="mx-auto">
          <Label name="Market Liquidity" />
          <label className="input-group">
            <input
              type="text"
              {...register("liquidity", { required: true })}
              className="input input-bordered"
              placeholder="0.01"
            />
            <span>Matic</span>
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-lg mt-7">
        Create Market
      </button>
    </form>
  );
};
