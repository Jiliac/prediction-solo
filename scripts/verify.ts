import { run } from "hardhat";

const { NEXT_PUBLIC_MUMBAI_CONTRACT, NEXT_PUBLIC_POLYGON_CONTRACT } =
  process.env;
const addrToVerify = NEXT_PUBLIC_MUMBAI_CONTRACT;

async function main() {
  await run("verify:verify", {
    address: addrToVerify,
    constructorArguments: [],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
