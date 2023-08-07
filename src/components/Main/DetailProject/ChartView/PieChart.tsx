import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { List } from '../../../../types/List.type';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  countCardInList: (listId: number) => number;
  listFilterTable: List[];
}

export const initialState = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      data: [15, 19, 3, 5, 2],
      label: 'percent of',
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const PieChart = ({ countCardInList, listFilterTable }: PieChartProps) => {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    let listName = [];
    for (let i = 0; i < listFilterTable.length; i++) {
      listName.push(listFilterTable[i].name);
    }

    let counts = [];
    for (let i = 0; i < listFilterTable.length; i++) {
      let count = countCardInList(listFilterTable[i].id);
      counts.push(count);
    }

    setData({
      ...data,
      labels: listName,
      datasets: [{ ...initialState.datasets[0], data: counts }],
    });
  }, [listFilterTable]);

  return <Pie data={data} />;
};

export default PieChart;
