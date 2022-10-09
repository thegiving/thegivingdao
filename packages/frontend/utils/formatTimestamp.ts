function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp * 1);

    const options: any = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const dateStr = `${date.toLocaleString("en-US", options)}`;
    return dateStr;
  }

  export default formatTimestamp;
