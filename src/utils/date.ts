export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString().toString()?.split("/").join("-");
};
