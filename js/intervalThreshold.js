const intervalThreshold = (interval) => {
  const monthlyInterval_ms = 28 * 24 * 60 * 60 * 1000;
  const dailyInterval_ms = 24 * 60 * 60 * 1000;
  const daysOfThreshold = 3;

  if (interval > monthlyInterval_ms) {
    return (threshold = interval + dailyInterval_ms * daysOfThreshold);
  } else {
    return (threshold = interval);
  }
};

module.exports = intervalThreshold;
