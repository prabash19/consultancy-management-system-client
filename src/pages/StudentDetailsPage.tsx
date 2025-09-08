import { useParams } from "react-router-dom";
type Academic = {
  degree: string;
  institution: string;
  gpa: string;
  year: number;
};

type LanguageTest = {
  name: string;
  score: string;
};

type Profile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  personalNote: string;
  city: string;
  country: string;
  academics: Academic[];
  languageTests: LanguageTest[];
};

const profileData: Profile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+64-288-555-555",
  address: "123 Green Street",
  personalNote: "Type and save any personal note required for the student",
  city: "Auckland",
  country: "New Zealand",
  academics: [
    {
      degree: "High School",
      institution: "ABC High School",
      gpa: "4.0",
      year: 2015,
    },
    {
      degree: "Bachelor's",
      institution: "XYZ University",
      gpa: "3.8",
      year: 2019,
    },
    {
      degree: "Master's",
      institution: "LMN University",
      gpa: "3.9",
      year: 2023,
    },
  ],
  languageTests: [{ name: "IELTS", score: "7.5" }],
};

function StudentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">{profileData.name}'s Profile</h1>

      {/* Contact & Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Contact Details</h2>
          <p>
            <strong>Email:</strong> {profileData.email}
          </p>
          <p>
            <strong>Phone:</strong> {profileData.phone}
          </p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Address</h2>
          <p>{profileData.address}</p>
          <p>
            {profileData.city}, {profileData.country}
          </p>
        </div>
      </div>
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Personal Note</h2>
        <p>
          <strong>Note:</strong> {profileData.personalNote}
        </p>
      </div>

      {/* Academic Qualifications */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Academic Qualifications</h2>
        <table className="min-w-full table-auto border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b">Degree</th>
              <th className="px-4 py-2 text-left border-b">Institution</th>
              <th className="px-4 py-2 text-left border-b">GPA/Score</th>
              <th className="px-4 py-2 text-left border-b">Year</th>
            </tr>
          </thead>
          <tbody>
            {profileData.academics.map((item, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50">
                <td className="px-4 py-2 border-b">{item.degree}</td>
                <td className="px-4 py-2 border-b">{item.institution}</td>
                <td className="px-4 py-2 border-b">{item.gpa}</td>
                <td className="px-4 py-2 border-b">{item.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Language Tests */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Language Test Scores</h2>
        <table className="min-w-full table-auto border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b">Test</th>
              <th className="px-4 py-2 text-left border-b">Score</th>
            </tr>
          </thead>
          <tbody>
            {profileData.languageTests.map((test, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50">
                <td className="px-4 py-2 border-b">{test.name}</td>
                <td className="px-4 py-2 border-b">{test.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentDetailsPage;
