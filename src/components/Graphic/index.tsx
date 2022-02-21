import ReactApexChart from "react-apexcharts";

const TasksChart: React.FC = () => {
  const options = {
    chart: {
      height: 350,
      zoom: {
        enabled: true,
      },
    },
  };

  const series = [
    {
      name: "All Tasks",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "My Tasks",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  return (
    <>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </>
  );
};

export default TasksChart;
