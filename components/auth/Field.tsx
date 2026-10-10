interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Field({ label, id, className = "", ...rest }: Props) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        className={`h-11 w-full rounded-lg border border-base-300 bg-base-100 px-3 text-sm outline-none transition placeholder:text-base-content/45 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-base-200 ${className}`}
        {...rest}
      />
    </div>
  );
}
