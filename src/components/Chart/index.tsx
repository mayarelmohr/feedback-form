import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useFeedbackListContext } from "store/context/feedbackProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: "y" as const,
  scales: {
    x: {
      title: {
        display: true,
        text: "Number of Users",
      },
      ticks: {
        precision: 0,
      },
    },
    y: {
      title: {
        display: true,
        text: "Rating",
      },
    },
  },
};
const labels = ["1 star", "2 stars", "3 stars", "4 stars", "5 stars"];

const Chart = () => {
  const {
    state: { ratingList },
  } = useFeedbackListContext();
  const data = {
    labels: labels,
    datasets: [
      {
        axis: "y",
        label: "User ratings",
        data: ratingList,
        backgroundColor: "#0c1142",
      },
    ],
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;
