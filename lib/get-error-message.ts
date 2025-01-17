const getErrorMessage = (error: unknown, defaultMessage?: string): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = defaultMessage ?? "Something went wrong";
  }

  return message;
};

export default getErrorMessage;
