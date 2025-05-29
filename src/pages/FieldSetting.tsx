import { useState } from "react";

export const FieldSettingsPanel = () => {
  const [selectedField, setSelectedField] = useState<number | null>(null);
  const fields = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    description: `File Description ${i + 1}`,
    dataType: "text",
    active: false,
  }));

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4 mt-6 shadow-md">
      {/* Department/Subdepartment Labels */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600 block">Department</label>
          <div className="bg-blue-600 text-white text-center py-2 rounded-md">
            Payroll
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600 block">Sub-Department</label>
          <div className="bg-blue-100 text-blue-700 text-center py-2 rounded-md">
            None
          </div>
        </div>
      </div>

      {/* Default Fields */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
          Default Text Field
        </button>
        <input
          className="border px-4 py-2 rounded text-sm"
          placeholder="File Description"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
          Default Date Field
        </button>
        <input
          className="border px-4 py-2 rounded text-sm"
          placeholder="File Date"
        />
      </div>

      {/* Fields Table */}
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            onClick={() => setSelectedField(index)}
            className={`grid grid-cols-5 items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${
              selectedField === index
                ? "bg-blue-100 border border-blue-600"
                : "bg-gray-50"
            }`}
          >
            <div className="text-sm font-medium text-gray-700">
              Field {field.id}
            </div>
            <input type="checkbox" className="mx-auto" />
            <input
              type="text"
              className="col-span-2 px-2 py-1 border rounded text-sm"
              value={field.description}
              readOnly
            />
            <div className="flex items-center justify-end gap-2">
              <label className="text-sm">
                <input type="radio" name={`type-${index}`} defaultChecked />{" "}
                Text
              </label>
              <label className="text-sm">
                <input type="radio" name={`type-${index}`} /> Date
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Archive Settings */}
      <div className="border-t pt-4 space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" /> Active
        </label>
        <div className="flex items-center gap-2">
          <label className="text-sm">No. of Years before ARCHIVE:</label>
          <input
            type="number"
            defaultValue={5}
            className="border px-2 py-1 w-16 rounded text-sm"
          />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center pt-4">
        <div className="space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
            Save
          </button>
          <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded text-sm">
            Cancel
          </button>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
          Export to Excel
        </button>
      </div>
    </div>
  );
};
