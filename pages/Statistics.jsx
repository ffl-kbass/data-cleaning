import Title from "../components/Title";
import Stats from "../components/Stats";
import Badge from "../components/Badge";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  maintainAspectRatio: false,
};

const labels = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Minor Outlying Islands",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "U.S. Virgin Islands",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Cleanliness",
      data: labels.map(() => 100),
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.5)",
      borderRadius: 5,
    },
  ],
};

export const optionsLine = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  maintainAspectRatio: false,
};

const labelsLine = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

export const dataLine = {
  labels: labelsLine,
  datasets: [
    {
      label: "Cleanliness",
      data: labelsLine.map((item, index) => index * 5),
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 1)",
    },
  ],
};

export const optionsHor = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
  },
  maintainAspectRatio: false,
};

const labelsHor = ["Tim Bethke", "Patrick Burke", "Kenny Bass"];

export const dataHor = {
  labels: labelsHor,
  datasets: [
    {
      label: "Janitors",
      data: labelsHor.map((item, index) => index * 100),
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.5)",
      borderRadius: 5,
    },
  ],
};

const Statistics = () => {
  return (
    <div>
      <Title>Statistics</Title>
      <div className="mb-8 grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-3">
        <Stats title="Top Cleaners">
          <ol className="h-full w-full space-y-2 px-4 py-2">
            <li className="flex items-center gap-2">
              <Badge type="success">1</Badge>
              Kenny Bass
            </li>
            <li className="flex items-center gap-2">
              <Badge type="success">2</Badge>
              Kenny Bass
            </li>
            <li className="flex items-center gap-2">
              <Badge type="success">3</Badge>
              Kenny Bass
            </li>
          </ol>
        </Stats>
        <Stats title="Bottom Cleaners">
          <ol className="h-full w-full space-y-2 px-4 py-2">
            <li className="flex items-center gap-2">
              <Badge type="emergency">15</Badge>
              Kenny Bass
            </li>
            <li className="flex items-center gap-2">
              <Badge type="emergency">14</Badge>
              Kenny Bass
            </li>
            <li className="flex items-center gap-2">
              <Badge type="emergency">13</Badge>
              Kenny Bass
            </li>
          </ol>
        </Stats>
        <Stats title="Needs Attention">
          <ol className="h-full w-full space-y-2 px-4 py-2">
            <li className="flex items-center gap-2">
              <Badge type="emergency">48</Badge>
              Oklahoma
            </li>
            <li className="flex items-center gap-2">
              <Badge type="emergency">49</Badge>
              Texas
            </li>
            <li className="flex items-center gap-2">
              <Badge type="emergency">50</Badge>
              Alaska
            </li>
          </ol>
        </Stats>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-64">
          <Stats title="State Cleanliness">
            <Bar options={options} data={data} />
          </Stats>
        </div>
        <div className="h-64">
          <Stats title="Year To Date Cleanliness">
            <Line options={optionsLine} data={dataLine} />
          </Stats>
        </div>
        <div className="h-64">
          <Stats title="Janitors">
            <Bar options={optionsHor} data={dataHor} />
          </Stats>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
