import React from "react";
import { useNavigate } from "react-router-dom";
import { useDocument } from "../contexts/DocumentContext";
import DocumentCard from "../components/documents/DocumentCard";

const DepartmentFiles: React.FC = () => {
  const { documents } = useDocument();
  const navigate = useNavigate();

  // Group documents by department
  const documentsByDepartment = documents.reduce((acc, doc) => {
    if (!acc[doc.department]) {
      acc[doc.department] = [];
    }
    acc[doc.department].push(doc);
    return acc;
  }, {} as Record<string, typeof documents>);

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Department Files
      </h1>
      <div className="w-full flex gap-4 flex-wrap">
        {Object.entries(documentsByDepartment).map(([department, docs]) => (
          <div key={department} className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              {department}
            </h2>
            <div className="w-full flex gap-4 flex-wrap">
              {docs.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  onClick={() => navigate(`/documents/${document.id}`)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentFiles;
