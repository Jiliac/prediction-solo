export const NewMarketForm = () => {
  return (
    <form className="shadow-lg rounded-xl mt-7 p-7 w-full">
      <div className="form-control my-6">
        <label className="label">
          <span className="label-text">Question</span>
        </label>
        <input
          type="text"
          placeholder="Where will the sun rise?"
          className="input input-bordered"
        />
      </div>

      <div className="form-control my-6">
        <label className="label">
          <span className="label-text">Initial Probability</span>
        </label>
        <div className="flex flex-row gap-10">
          <label className="input-group basis-1/4">
            <input
              type="text"
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
          <label className="label">
            <span className="label-text">Market Liquidity</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              className="input input-bordered"
              placeholder="0.01"
            />
            <span>Matic</span>
          </label>
        </div>
      </div>

      <button className="btn btn-primary btn-lg mt-7">Create Market</button>
    </form>
  );
};
