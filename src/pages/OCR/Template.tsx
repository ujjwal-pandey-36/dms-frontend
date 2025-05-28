import { Select } from "@/components/ui/Select";
import { Text } from "@chakra-ui/react";
import { useState } from "react";

export const TemplateOCR = () => {
  const [templateName, setTemplateName] = useState("");
  const [headerName, setHeaderName] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [selectedPDF, setSelectedPDF] = useState<File | null>();
  const [formData, setFormData] = useState({
    department: "",
    subdepartment: "",
    template: "",
  });
  const fields = [
    { name: "Registry", x: 398, y: 108, width: 180, height: 26 },
    { name: "Full Name", x: 72, y: 147, width: 504, height: 17 },
    { name: "Sex", x: 72, y: 177, width: 136, height: 13 },
    { name: "Header", x: 173, y: 68, width: 286, height: 22 },
  ];

  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-lg">
      {/* // HEADER  */}
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color="blue.600"
        textAlign="center"
        mb={6}
        mt={4}
      >
        Template Documents
      </Text>
      <div className="flex gap-4 p-4 w-full">
        {/* LEFT PANEL */}
        <div className="w-1/3 space-y-4">
          <div>
            <Select
              label="Department"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              options={[
                { value: "finance", label: "Finance" },
                { value: "payroll", label: "Payroll" },
                { value: "hr", label: "HR" },
              ]}
            />
          </div>

          <div>
            <Select
              label="Subdepartment"
              value={formData.subdepartment}
              onChange={(e) =>
                setFormData({ ...formData, subdepartment: e.target.value })
              }
              options={[
                { value: "payroll", label: "Payroll" },
                { value: "documents", label: "Documents" },
                { value: "records", label: "Records" },
              ]}
            />
          </div>

          <div>
            <Select
              label="OCR Template"
              value={formData.template}
              onChange={(e) =>
                setFormData({ ...formData, template: e.target.value })
              }
              options={[
                { value: "id", label: "ID Card" },
                { value: "birth", label: "Birth Certificate" },
                { value: "passport", label: "Passport" },
              ]}
            />
            <input
              type="text"
              className="mt-1 border w-full px-2 py-1 rounded"
              placeholder="Template Name"
              value={formData.template}
              onChange={(e) => setTemplateName(e.target.value)}
            />
            <div className="flex gap-2 mt-1">
              <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm flex-1">
                Add Template
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded text-sm flex-1">
                Delete Template
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block">Header</label>
            <input
              type="text"
              className="border w-full px-2 py-1 rounded"
              placeholder="e.g., CERTIFICATE OF LIVE BIRTH"
              value={headerName}
              onChange={(e) => setHeaderName(e.target.value)}
            />
            <button className="bg-gray-700 text-white px-2 py-1 rounded text-sm mt-1 w-full">
              Save Header Tag
            </button>
          </div>

          <div>
            <label className="text-sm font-medium block">Fields</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="border px-2 py-1 rounded flex-1"
                placeholder="Field Name"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
              />
              <button className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                Save Field
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                Delete Field
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block">Select PDF</label>
            <div className="flex gap-2">
              <input
                type="file"
                className="border px-2 py-1 rounded flex-1"
                onChange={(e) => setSelectedPDF(e.target.files?.[0] || null)}
              />
              <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm">
                Upload
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-2/3 space-y-4">
          {/* Coordinates Table */}
          <div className="overflow-auto max-h-40 border rounded">
            <table className="text-sm w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1 text-left">Field Name</th>
                  <th className="border px-2 py-1">X</th>
                  <th className="border px-2 py-1">Y</th>
                  <th className="border px-2 py-1">Width</th>
                  <th className="border px-2 py-1">Height</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">{field.name}</td>
                    <td className="border px-2 py-1 text-center">{field.x}</td>
                    <td className="border px-2 py-1 text-center">{field.y}</td>
                    <td className="border px-2 py-1 text-center">
                      {field.width}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {field.height}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Image Display */}
          <div className="h-[500px] border rounded overflow-hidden">
            <img
              src="/sample.png"
              alt="OCR Template"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
