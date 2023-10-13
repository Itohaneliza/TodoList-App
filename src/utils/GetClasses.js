export const GetClasses = (classes) => {
  return classes
    .filter((item) => item !== "")
    .join(" ")
    .trim();
};
