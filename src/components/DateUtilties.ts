  const getSelectedDateString = (selectedDate?: Date | null) => {
    return selectedDate?.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  export { getSelectedDateString };