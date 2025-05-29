import {
  // ChevronDown,
  PlusCircle,
  Trash2,
  Pencil,
  Search,
  SlidersHorizontal,
  // Check,
  Save,
} from "lucide-react";
import { useState } from "react";
import { FieldSettingsPanel } from "../FieldSetting";
type PermissionKey =
  | "view"
  | "add"
  | "edit"
  | "delete"
  | "print"
  | "confidential";

type UserPermission = {
  username: string;
} & Record<PermissionKey, boolean>;

const mockUsers = ["admin", "johndoe", "janedoe", "someone"];

const defaultPermissions = {
  view: true,
  add: true,
  edit: true,
  delete: true,
  print: true,
  confidential: true,
};

export const AllocationPanel = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDept, setSelectedDept] = useState("Payroll");
  const [selectedSubDept, setSelectedSubDept] = useState("SAMPLE DOCUMENTS");
  const [showFieldsPanel, setShowFieldsPanel] = useState(false);
  const [users, setUsers] = useState<UserPermission[]>([
    {
      username: "admin",
      ...defaultPermissions,
    },
  ]);

  const departments = ["Payroll", "HR", "Finance"];
  const subDepartments = ["SAMPLE DOCUMENTS", "CONTRACTS", "REPORTS"];

  const handleEditClick = () => {
    if (!isEditMode) {
      const editableUsers = mockUsers.map((username) => ({
        username,
        view: true,
        add: true,
        edit: false,
        delete: false,
        print: true,
        confidential: false,
      }));
      setUsers(editableUsers);
    }
    setIsEditMode(!isEditMode);
  };

  const togglePermission = (username: string, field: PermissionKey) => {
    setUsers((prev) =>
      prev.map((user: UserPermission) =>
        user.username === username ? { ...user, [field]: !user[field] } : user
      )
    );
  };

  const handleSubDeptAdd = () => {
    const name = prompt("Enter  Sub-Department name:");
    if (name) alert(`Sub-Department "${name}" added.`);
  };

  const handleSubDeptDelete = () => {
    const confirmDelete = confirm(
      `Are you sure you want to delete "${selectedSubDept}"?`
    );
    if (confirmDelete) alert(`Sub-Department "${selectedSubDept}" deleted.`);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-800">Allocation</h1>
        <button
          className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm hover:bg-blue-200"
          onClick={() => setShowFieldsPanel(!showFieldsPanel)}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Fields
        </button>
      </div>
      {showFieldsPanel && <FieldSettingsPanel />}
      {/* Search */}
      {/* <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700">
          <Search className="w-4 h-4" />
          Search
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}

      {/* Department Selection */}
      <div className="border rounded-md p-4 bg-blue-50 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Department
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 text-sm"
            >
              {departments.map((dept) => (
                <option key={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Sub-Department
            </label>
            <select
              value={selectedSubDept}
              onChange={(e) => setSelectedSubDept(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 text-sm"
            >
              {subDepartments.map((sub) => (
                <option key={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Subdepartment Actions */}
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={handleSubDeptAdd}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            <PlusCircle className="w-4 h-4" />
            Add Sub-Department
          </button>
          <button
            onClick={handleSubDeptDelete}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm hover:bg-red-200"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2">View</th>
              <th className="px-4 py-2">Add</th>
              <th className="px-4 py-2">Edit</th>
              <th className="px-4 py-2">Delete</th>
              <th className="px-4 py-2">Print</th>
              <th className="px-4 py-2">Confidential</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.username} className="bg-white text-gray-700">
                <td className="px-4 py-2 font-medium">{user.username}</td>
                {(
                  [
                    "view",
                    "add",
                    "edit",
                    "delete",
                    "print",
                    "confidential",
                  ] as PermissionKey[]
                ).map((field) => (
                  <td key={field} className="text-center">
                    <input
                      type="checkbox"
                      checked={user[field]}
                      onChange={() =>
                        isEditMode && togglePermission(user.username, field)
                      }
                      disabled={!isEditMode}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-2">
        <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700">
          <PlusCircle className="w-4 h-4" />
          Add
        </button>
        <button
          onClick={handleEditClick}
          className="flex items-center gap-1 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm hover:bg-blue-200"
        >
          {isEditMode ? (
            <Save className="w-4 h-4" />
          ) : (
            <Pencil className="w-4 h-4" />
          )}
          {isEditMode ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};
