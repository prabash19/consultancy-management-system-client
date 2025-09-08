import Table from "../components/Table";
import type { Column } from "../components/Table";
import { useNavigate } from "react-router-dom";

type Student = {
  id: number;
  name: string;
  visaLodged: string;
  phoneNumber: string;
};

const students: Student[] = [
  {
    id: 1,
    name: "Alice Alice",
    visaLodged: "Yes",
    phoneNumber: "+64-288-222-222",
  },
  {
    id: 2,
    name: "Bob Charlie",
    visaLodged: "No",
    phoneNumber: "+64-288-222-222",
  },
  {
    id: 3,
    name: "Charlie Alice",
    visaLodged: "Yes",
    phoneNumber: "+64-288-222-222",
  },
  {
    id: 4,
    name: "Bob Charlie",
    visaLodged: "No",
    phoneNumber: "+64-288-222-222",
  },
  {
    id: 5,
    name: "Charlie Alice",
    visaLodged: "Yes",
    phoneNumber: "+64-288-222-222",
  },
];

export default function StudentsPage() {
  const navigate = useNavigate();

  const columns: Column<Student>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "visaLodged", label: "Visa Lodged" },
    { key: "phoneNumber", label: "Phone Number" },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <button
          className="bg-violet-600 text-white px-3 py-1 rounded hover:bg-violet-700 hover:cursor-pointer"
          onClick={() => navigate(`/students/${row.id}`)}
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <Table columns={columns} data={students} />
    </div>
  );
}
