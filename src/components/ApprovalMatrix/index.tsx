import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, X, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDocumentTypeSelection } from './useDepartmentSelection';
import {
  ApprovalMatrixList,
  createApprovalMatrix,
  deleteApprovalMatrix,
  listApprovalMatrix,
} from './approvalMatrixAPIs';

const ApprovalMatrix = () => {
  const {
    selectedDepartment,
    setSelectedDepartment,
    selectedDocumentType,
    setSelectedDocumentType,
    departmentOptions,
    documentTypeOptions,
    resetSelection,
  } = useDocumentTypeSelection();

  const [allMatrices, setAllMatrices] = useState<ApprovalMatrixList[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [approvalRule, setApprovalRule] = useState<'all' | 'majority'>('all');
  const [numberOfApprovers, setNumberOfApprovers] = useState<number>(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await listApprovalMatrix();
      setAllMatrices(data);
    } catch (err) {
      toast.error('Failed to fetch approval matrix list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!selectedDepartment || !selectedDocumentType) {
      toast.error('Please select department and document type');
      return;
    }
    if (approvalRule === 'majority' && !numberOfApprovers) {
      toast.error('Please specify number of approvers');
      return;
    }

    const payload = {
      deptID: Number(
        departmentOptions.find((d) => d.label === selectedDepartment)?.value
      ),
      subDeptID: Number(
        documentTypeOptions.find((d) => d.label === selectedDocumentType)?.value
      ),
      AllorMajority: approvalRule,
      NumberofApprover: numberOfApprovers,
    };

    try {
      await createApprovalMatrix(payload);
      toast.success('Approval matrix saved successfully!');
      resetSelection();
      setApprovalRule('all');
      setNumberOfApprovers(1);
      fetchData();
    } catch (err) {
      toast.error('Failed to save approval matrix');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteApprovalMatrix(id);
      toast.success('Deleted successfully');
      fetchData();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Approval Matrix</h1>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium">Department</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">Select Department</option>
            {departmentOptions.map((dept) => (
              <option key={dept.value} value={dept.label}>
                {dept.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Document Type</label>
          <select
            value={selectedDocumentType}
            onChange={(e) => setSelectedDocumentType(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            disabled={!selectedDepartment}
          >
            <option value="">Select Document Type</option>
            {documentTypeOptions.map((docType) => (
              <option key={docType.value} value={docType.label}>
                {docType.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Approval Rule</label>
          <select
            value={approvalRule}
            onChange={(e) =>
              setApprovalRule(e.target.value as 'all' | 'majority')
            }
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="all">All</option>
            <option value="majority">Majority</option>
          </select>
        </div>

        {approvalRule === 'majority' && (
          <div>
            <label className="block text-sm font-medium">
              Number of Approvers
            </label>
            <input
              type="number"
              value={numberOfApprovers}
              min={1}
              onChange={(e) => setNumberOfApprovers(Number(e.target.value))}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end mb-8">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-md flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Save</span>
        </button>
      </div>

      {/* List */}
      <h2 className="text-xl font-semibold mb-4">Existing Matrices</h2>
      {loading ? (
        <p>Loading...</p>
      ) : allMatrices.length === 0 ? (
        <p className="text-gray-500">No approval matrices found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 border">Department</th>
              <th className="px-3 py-2 border">Sub-Dept</th>
              <th className="px-3 py-2 border">Rule</th>
              <th className="px-3 py-2 border">Number of Approvers</th>
              <th className="px-3 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allMatrices.map((m) => (
              <tr key={m.id}>
                <td className="px-3 py-2 border">{m.deptID}</td>
                <td className="px-3 py-2 border">{m.subDeptID}</td>
                <td className="px-3 py-2 border">{m.AllorMajority}</td>
                <td className="px-3 py-2 border">{m.NumberofApprover}</td>
                <td className="px-3 py-2 border flex space-x-3">
                  <button className="text-blue-600 hover:underline flex items-center">
                    <Pencil className="h-4 w-4 mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-red-600 hover:underline flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApprovalMatrix;
