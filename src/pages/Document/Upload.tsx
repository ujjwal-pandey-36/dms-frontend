import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Search } from "lucide-react";
import React, { useState } from "react";

interface Document {
  id: string;
  department: string;
  subdepartment: string;
  fileDescription: string;
  fileDate: string;
  name: string;
  description: string;
  expirationDate?: string;
  confidential: boolean;
  remarks: string;
  fileName?: string;
}

const dummyDepartments = [
  { value: "finance", label: "Finance" },
  { value: "payroll", label: "Payroll" },
  { value: "hr", label: "HR" },
];

const dummySubdepartments = [
  { value: "teamA", label: "Team A" },
  { value: "teamB", label: "Team B" },
  { value: "teamC", label: "Team C" },
];

export default function DocumentUpload() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [newDoc, setNewDoc] = useState<Partial<Document>>({
    department: "Main Office",
    subdepartment: "Sub Office",
    fileDate: new Date().toISOString().split("T")[0],
    expirationDate: new Date().toISOString().split("T")[0],
    confidential: false,
  });

  const handleAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setNewDoc((prev) => ({ ...prev, fileName: file.name }));
    }
  };

  const handleAddOrUpdate = () => {
    if (!newDoc.name || !newDoc.fileDescription) return;
    if (editId) {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === editId ? ({ ...doc, ...newDoc } as Document) : doc
        )
      );
    } else {
      setDocuments([
        ...documents,
        {
          ...newDoc,
          id: `doc-${Date.now()}`,
          remarks: newDoc.remarks || "",
        } as Document,
      ]);
    }
    setNewDoc({
      department: "Main Office",
      subdepartment: "Sub Office",
      confidential: false,
    });
    setSelectedFile(null);
    setEditId(null);
  };

  const handleEdit = (id: string) => {
    const doc = documents.find((d) => d.id === id);
    if (doc) {
      setNewDoc(doc);
      setEditId(id);
    }
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const filteredDocs = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col bg-white rounded-md shadow-lg animate-fade-in p-6 space-y-4">
      <header className="text-left flex-1">
        <h1 className="text-3xl font-bold text-blue-800">Upload</h1>
        <p className="mt-2 text-gray-600">
          Upload files to the system for easy access and organization.{" "}
        </p>
      </header>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-black">
          <div>
            {/* <label>Department</label> */}
            <Select
              label="Department"
              value={newDoc.department}
              onChange={(e) =>
                setNewDoc({ ...newDoc, department: e.target.value })
              }
              options={dummyDepartments}
            />
          </div>
          <div>
            {/* <label>Subdepartment</label> */}
            <Select
              label="Sub-Department"
              value={newDoc.subdepartment}
              onChange={(e) =>
                setNewDoc({ ...newDoc, subdepartment: e.target.value })
              }
              options={dummySubdepartments}
            />
          </div>
          <div>
            <label>File Description</label>
            <Input
              value={newDoc.fileDescription || ""}
              onChange={(e) =>
                setNewDoc({ ...newDoc, fileDescription: e.target.value })
              }
            />
          </div>
          <div>
            <label>File Date</label>
            <Input
              type="date"
              value={newDoc.fileDate}
              onChange={(e) =>
                setNewDoc({ ...newDoc, fileDate: e.target.value })
              }
            />
          </div>
          <div>
            <label>Name</label>
            <Input
              value={newDoc.name || ""}
              onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
            />
          </div>
          <div>
            <label>Description</label>
            <Input
              value={newDoc.description || ""}
              onChange={(e) =>
                setNewDoc({ ...newDoc, description: e.target.value })
              }
            />
          </div>
          <div>
            <label>Expiration Date</label>
            <Input
              type="date"
              value={newDoc.expirationDate}
              onChange={(e) =>
                setNewDoc({ ...newDoc, expirationDate: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newDoc.confidential}
              // onCheckedChange={(val) =>
              //   setNewDoc({ ...newDoc, confidential: Boolean(val) })
              // }
              onChange={(e) =>
                setNewDoc({ ...newDoc, confidential: e.target.checked })
              }
            />
            <label>Confidential</label>
          </div>
          <div className="col-span-2">
            <label>Remarks</label>
            <textarea
              className="w-full border rounded p-2"
              rows={3}
              value={newDoc.remarks || ""}
              onChange={(e) =>
                setNewDoc({ ...newDoc, remarks: e.target.value })
              }
            ></textarea>
          </div>
          <div>
            <label>Attachment</label>
            <Input type="file" onChange={handleAttach} />
            {selectedFile && (
              <p className="text-sm mt-1 text-blue-700">
                Attached: {selectedFile.name}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center ">
          <Button onClick={handleAddOrUpdate} className="w-1/4">
            {editId ? "Update" : "Add"} Document
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-lg font-semibold w-full">Document List</h2>
          <Input
            className="w-full"
            placeholder="Search by Name or Description"
            icon={<Search />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {filteredDocs.length === 0 ? (
          <p className="text-gray-600 text-xl font-semibold text-center">
            No documents found.
          </p>
        ) : (
          <table className="w-full text-sm border mt-4">
            <thead className="bg-blue-100">
              <tr>
                <th className="border p-2">File</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Expiration</th>
                <th className="border p-2">Attachment</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="odd:bg-gray-50 even:bg-white">
                  <td className="border p-2">{doc.id}</td>
                  <td className="border p-2">{doc.name}</td>
                  <td className="border p-2">{doc.description}</td>
                  <td className="border p-2">{doc.expirationDate || "-"}</td>
                  <td className="border p-2">{doc.fileName || "-"}</td>
                  <td className="border p-2 flex gap-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(doc.id)}
                      className="w-full"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(doc.id)}
                      className="w-full"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
