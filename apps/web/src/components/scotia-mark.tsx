interface ScotiaMarkProps {
  className?: string;
}

export function ScotiaMark({ className }: ScotiaMarkProps) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <span
        aria-hidden
        className="grid h-7 w-7 place-items-center rounded-md bg-scotia-red text-white"
      >
        <span className="text-[14px] font-black leading-none">S</span>
      </span>
      <span className="text-[15px] font-bold tracking-tight text-scotia-navy">
        Scotia
      </span>
    </div>
  );
}
