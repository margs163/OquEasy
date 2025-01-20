import Image from "next/image";

export default function LoginProviders({ children, setProvider }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-medium leading-loose text-neutral-500">
        {children}
      </p>
      <div className="flex flex-row gap-4">
        <Image src={"/google.svg"} alt="google" width={32} height={32} />
        <Image src={"/github.svg"} alt="github" width={32} height={32} />
        <Image src={"/twitter.svg"} alt="twitter" width={32} height={32} />
      </div>
    </div>
  );
}
