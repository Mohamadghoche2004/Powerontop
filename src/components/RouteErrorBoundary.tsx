import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";

/**
 * Shown when a route throws — NOT the same as "URL not found".
 * Previously this was NotFound, which confused users into thinking /cart etc. didn't exist.
 */
export default function RouteErrorBoundary() {
  const error = useRouteError();
  let title = "Something went wrong";
  let message = "An unexpected error occurred. Please try again.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = error.data?.message ?? message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="grid min-h-[50vh] place-items-center bg-white px-6 py-16">
      <div className="text-center max-w-lg">
        <p className="text-base font-semibold text-red-600">Error</p>
        <h1 className="mt-4 text-3xl font-semibold text-gray-900">{title}</h1>
        <p className="mt-4 text-gray-600 break-words">{message}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
          >
            Go home
          </Link>
          <Link to="/cart" className="text-sm font-semibold text-purple-600 hover:underline">
            View cart
          </Link>
        </div>
      </div>
    </main>
  );
}
