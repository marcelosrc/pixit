export default function formatDate(date) {
  const formattedDate = new Date(date);
  const [day, month, year, hours, minutes] = [
    formattedDate.getDate(),
    formattedDate.getMonth(),
    formattedDate.getFullYear(),
    formattedDate.getHours(),
    (formattedDate.getMinutes() < 10 ? "0" : "") + formattedDate.getMinutes(),
  ];
  return (
    <>
      <p>
        {day}/{month}/{year}
      </p>
      <p>
        {hours}:{minutes}
      </p>
    </>
  );
}
