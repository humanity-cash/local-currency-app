export const isSuccessResponse = (response: { status: number }): boolean => {
  if (response.status >= 200 && response.status <= 299) {
    return true;
  } else return false;
};

export const delay = (n: number): Promise<void> => {
  return new Promise(function(resolve) {
    setTimeout(resolve, n * 1000);
  });
};
