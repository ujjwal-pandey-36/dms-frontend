import { Select } from "@/components/ui/Select";
import { useState } from "react";

const OCRUnrecordedUI = () => {
  const [formData, setFormData] = useState({
    department: "",
    subdepartment: "",
    template: "",
    accessId: "",
    selectedDoc: "",
  });

  const documents = [
    "BC-187_document-0000000349.pdf",
    "BC-187_document-0000000348.pdf",
    "BC-187_document-0000000347.pdf",
    "BC-187_document-0000000346.pdf",
    "BC-187_document-0000000345.pdf",
    "BC-187_document-0000000344.pdf",
    "BC-187_document-0000000343.pdf",
  ];

  return (
    <div className="flex w-full bg-gray-50">
      {/* Left Panel */}
      <div className="w-1/3 p-6 space-y-4 border-r bg-white">
        <Select
          label="Department"
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
          options={[
            { value: "payroll", label: "Payroll" },
            { value: "hr", label: "HR" },
          ]}
        />

        <Select
          label="Subdepartment"
          value={formData.subdepartment}
          onChange={(e) =>
            setFormData({ ...formData, subdepartment: e.target.value })
          }
          options={[
            { value: "documents", label: "Documents" },
            { value: "records", label: "Records" },
          ]}
        />

        <Select
          label="OCR Template"
          value={formData.template}
          onChange={(e) =>
            setFormData({ ...formData, template: e.target.value })
          }
          options={[
            { value: "birth", label: "Birth Certificate" },
            { value: "passport", label: "Passport" },
          ]}
        />

        {/* <Select
          label="Access Level"
          value={formData.accessId}
          onChange={(e) =>
            setFormData({ ...formData, accessId: e.target.value })
          }
          options={[
            { value: "user", label: "User" },
            { value: "manager", label: "Manager" },
            { value: "admin", label: "Administrator" },
          ]}
        /> */}

        <div className="bg-orange-100 text-orange-700 font-semibold px-4 py-2 rounded text-center">
          8 Unrecorded Documents
        </div>

        <div className="border rounded p-2 h-40 overflow-y-auto">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              onClick={() => setFormData({ ...formData, selectedDoc: doc })}
              className={`cursor-pointer text-sm px-2 py-1 rounded hover:bg-blue-100 ${
                formData.selectedDoc === doc ? "bg-blue-200" : ""
              }`}
            >
              {doc}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-gray-300 py-1.5 rounded hover:bg-gray-400 text-sm">
            Load
          </button>
          <button className="flex-1 bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm">
            OCR
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-2/3 p-4 flex items-center justify-center relative bg-white">
        {formData.selectedDoc ? (
          <div className="relative w-full h-full border rounded-md overflow-hidden">
            <img
              src="/public/ocr/sample.png"
              alt="Document Preview"
              className="object-contain w-full h-full"
            />
            <div className="absolute bottom-2 left-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              Drag to select OCR area then click "OCR"
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Select a document to preview</p>
        )}
      </div>
    </div>
  );
};

export default OCRUnrecordedUI;
