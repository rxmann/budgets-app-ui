import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Simple Breadcrumbs component.
 * It reads the current pathname, splits it by '/', and renders each segment as a link.
 * The first segment is always "Home" linking to "/".
 * Subsequent segments are capitalized.
 */
export const Breadcrumbs = () => {
  const pathname = usePathname();
  // Remove leading slash and split
  const segments = pathname?.replace(/^\//, "").split("/") || [];

  // Build cumulative paths for each segment
  const paths = segments.map((seg, idx) => {
    return "/" + segments.slice(0, idx + 1).join("/");
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      {segments.map((seg, idx) => (
        <span key={idx} className="flex items-center">
          <span className="mx-1">/</span>
          {idx === segments.length - 1 ? (
            <span className="font-medium text-foreground capitalize">
              {seg}
            </span>
          ) : (
            <Link href={paths[idx]} className="hover:underline capitalize">
              {seg}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};
export default Breadcrumbs;
