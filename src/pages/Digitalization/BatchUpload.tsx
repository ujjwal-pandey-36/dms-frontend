import { UploadCloud, Trash2, Eye } from "lucide-react";

export const BatchUploadPanel = () => {
  const files = [
    {
      name: "Payroll_June.xlsx",
      type: "Excel",
      size: "220 KB",
      status: "Success",
    },
    { name: "HR_Records.pdf", type: "PDF", size: "115 KB", status: "Pending" },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-blue-800">Batch Upload</h2>
        <button className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm hover:bg-blue-200">
          <UploadCloud className="w-4 h-4" />
          Upload
        </button>
      </div>

      {/* Drag and Drop Area */}
      <div className="border-2 border-dashed border-blue-300 rounded-md p-6 text-center bg-blue-50 hover:bg-blue-100 transition">
        <p className="text-sm text-gray-600">
          Drag & drop files here or click to upload
        </p>
        <input type="file" multiple className="hidden" />
      </div>

      {/* Uploaded Files Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">File Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Size</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, i) => (
              <tr key={i} className="bg-white border-t text-gray-700">
                <td className="px-4 py-2 font-medium">{file.name}</td>
                <td className="text-center">{file.type}</td>
                <td className="text-center">{file.size}</td>
                <td className="text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      file.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {file.status}
                  </span>
                </td>
                <td className="text-center flex justify-center items-center gap-2 py-2">
                  <button className="text-blue-600 hover:underline">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:underline">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
