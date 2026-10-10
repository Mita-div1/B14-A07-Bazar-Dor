/* eslint-disable @next/next/no-img-element */

interface AvatarProps {
  name?: string | null;
  image?: string | null;
  size?: number;
  rounded?: string;
}

/** Profile photo, or a green circle with the first letter when there is none. */
export default function Avatar({ name, image, size = 40, rounded = "rounded-full" }: AvatarProps) {
  const style = { width: size, height: size };

  if (image) {
    return <img src={image} alt={name ?? "প্রোফাইল ছবি"} style={style} className={`${rounded} shrink-0 object-cover`} referrerPolicy="no-referrer" />;
  }

  const letter = (name?.trim()[0] ?? "?").toUpperCase();
  return (
    <span
      style={{ ...style, fontSize: size * 0.42 }}
      className={`${rounded} flex shrink-0 items-center justify-center bg-primary font-semibold text-primary-content`}
      aria-hidden
    >
      {letter}
    </span>
  );
}
